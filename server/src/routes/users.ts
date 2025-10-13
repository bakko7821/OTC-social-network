import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import User from "../modules/User";
import { Friend, Gift } from "../modules";

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

router.get("/:id/playlists", async(req: Request, res: Response) => {
  try {
    const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: `Неверно переданный параметр. ID: ${id}`})
      }

    const user = await User.findByPk(id, {
      include: {
        association: "playlists", // это "as" из связи User.hasMany(...)
        attributes: ["id", "title", "image"], // что именно вернуть из плейлистов
      },
      attributes: [], // пустой массив, чтобы не возвращать данные самого пользователя
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user.playlists);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Ошибка сервера" });
  }
})

router.get("/:id/music", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: `Неверно переданный параметр. ID: ${id}` });
    }

    const user = await User.findByPk(id, {
      include: [
        {
          association: "music", // alias из User.belongsToMany
          attributes: ["id", "title", "author", "image", "file"],
          through: { attributes: [] }, // не показываем user_music
        },
      ],
      attributes: [],
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user.music || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id/friends", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const friends = await Friend.findAll({
      where: { userId: id },
      attributes: [
        "friendId",
        "friendFirstname",
        "friendLastname",
        "friendAvatar",
        "friendOnline"
      ],
    });
    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении друзей" });
  }
});

router.post("/:id/add-friend", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
     const userId = req.user?.id
    if (!userId) return res.status(401).json({ message: "Не авторизован" });

    const { id } = req.params;
    const friendUser = await User.findByPk(id);
    if (!friendUser) return res.status(404).json({ message: "Пользователь не найден" });

    await Friend.create({
      userId,
      friendId: friendUser.id,
      friendFirstname: friendUser.firstname,
      friendLastname: friendUser.lastname,
      friendAvatar: friendUser.avatarImage,
      friendOnline: friendUser.online,
    });

    res.json({ message: "Друг добавлен" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера"});
  }
});

router.get("/:id/gifts", async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const gifts = await Gift.findAll({
      where: { userId: id },
      attributes: [
        "id",
        "giftImage",
        "friendId",
        "friendFirstname",
        "friendLastname",
        "friendAvatar",
      ],
    });
    res.json(gifts);

  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Ошибка сервера"})
  }
})



export default router;
