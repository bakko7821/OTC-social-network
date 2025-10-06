import express, { Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import User from "../modules/User";

const router = express.Router();

router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = (req.user as any)?.id; // если в токене храним id
    if (!userId) {
      return res.status(400).json({ message: "Некорректный токен" });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "createdAt"]
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
