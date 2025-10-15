import { Router, Request, Response } from "express";
import { Storie } from "../modules";

const router = Router();

// GET /stories/:userId — получить все истории пользователя
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const stories = await Storie.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(stories);
  } catch (error) {
    console.error("Ошибка при получении историй:", error);
    res.status(500).json({ message: "Ошибка сервера при получении историй" });
  }
});

// POST /stories — создать новую историю
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, image, text } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Не указан userId" });
    }

    const newStory = await Storie.create({
      userId,
      image: image || null,
      text: text || null,
    });

    res.status(201).json(newStory);
  } catch (error) {
    console.error("Ошибка при создании истории:", error);
    res.status(500).json({ message: "Ошибка сервера при создании истории" });
  }
});

export default router;
