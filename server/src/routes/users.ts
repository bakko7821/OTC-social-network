import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";
import { Op } from "sequelize";

const router = express.Router();

router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = (req.user as any)?.id; // если в токене храним id
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
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
  } catch (err) {
    console.error("Ошибка при поиске пользователей:", err);
    res.status(500).json({ message: "Ошибка сервера" });
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
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Ошибка сервера" });
  }
})

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении пользователей" });
  }
});

export default router;
