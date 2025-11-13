import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";
import { Op } from "sequelize";

const router = express.Router();

router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = (req.user as any)?.id;
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при поиске информации о локальном пользователе." });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.username;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "Некорректный запрос" });
  }

  const cleanedQuery = query.startsWith("@") ? query.slice(1) : query;

  try {
    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: `${cleanedQuery}%`
        }
      },
      limit: 10,
    });

    res.json(users);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при поиске пользователей" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: `Неверно переданный параметр. ID: ${id}`})
      }

    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    res.json(user)
  } catch (error: unknown) {
    console.error(error)
    res.status(500).json({ message: "Ошибка при получении пользователя по ID." });
  }
})

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error: unknown) {
    console.error(error)
    res.status(500).json({ message: "Ошибка при получении пользователей." });
  }
});

router.put("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = (req.user as any)?.id;
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    const { fullname, description, phoneNumber, username, avatarImage } = req.body;

    let firstname = fullname;
    let lastname = "";
    if (fullname.includes(" ")) {
      const [first, ...rest] = fullname.split(" ");
      firstname = first;
      lastname = rest.join(" "); // всё после первого пробела
    }

    const updateData: any = {
      firstname,
      lastname,
      description,
      phoneNumber,
      username,
    };

    if (avatarImage && avatarImage.trim() !== "") {
      updateData.avatarImage = avatarImage;
    }

    const [count, users] = await User.update(updateData, {
      where: { id: userId },
      returning: true,
    });

    if (count === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userAfterUpdate = users[0];

    res.json({ user: userAfterUpdate });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при изменении информации о себе." });
  }
});

export default router;
