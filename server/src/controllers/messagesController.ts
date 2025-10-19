import { Request, Response } from "express";
import { Message } from "../modules";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.findAll({
      where: { roomId },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении сообщений" });
  }
};
