import express, { Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";

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

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении пользователей" });
  }
});

export default router;
