import { Router } from "express";
import Message from "../models/Message";
import express, { Request, Response } from "express";
import User from "../models/User";
import { Op } from "sequelize";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import type { SocketMessage, Dialog } from "../types";

interface MessageWithSender extends Message {
  sender?: {
    id: number;
    username: string;
    avatarImage: string;
  };
}

const router = express.Router();

router.get("/dialogs/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = (req.user as any)?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const dialogs = await Message.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "username", "firstname", "lastname", "avatarImage", "online"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["id", "username", "firstname", "lastname", "avatarImage", "online"],
        },
      ],
    }) as unknown as SocketMessage[];

    const uniqueChats: Record<number, Dialog> = {};

    for (const msg of dialogs) {
      const isSender = msg.senderId === Number(userId);
      const otherUser = isSender ? msg.receiver : msg.sender;
      const otherId = isSender ? msg.receiverId : msg.senderId;

      if (!uniqueChats[otherId] && otherUser) {
        uniqueChats[otherId] = {
          userId: otherUser.id,
          username: otherUser.username || `user_${otherUser.id}`,
          firstname: otherUser.firstname || "",
          lastname: otherUser.lastname || "",
          avatarImage: otherUser.avatarImage || "",
          online: otherUser.online ?? false,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
        };
      }
    }

    res.json(Object.values(uniqueChats));
  } catch (error) {
    console.error("Ошибка при получении диалогов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user?.id;

    if (!senderId) return res.status(401).json({ message: "Unauthorized" });
    if (!receiverId || !content)
      return res.status(400).json({ message: "receiverId и content обязательны" });

    // Проверка на дубликат за последние 5 секунд
    const recent = await Message.findOne({
      where: {
        senderId,
        receiverId,
        content,
        createdAt: { [Op.gte]: new Date(Date.now() - 5000) }, // 5 секунд
      },
    });

    if (recent) {
      return res.status(409).json({ message: "Duplicate message detected" });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      content,
    });

    res.json(message);
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:userId/:receiverId", async (req: Request, res: Response) => {
  const { userId, receiverId } = req.params;

  try {
    const messages = await Message.findAll({
    where: {
        [Op.or]: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
        ],
    },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/dialogs/:receiverId", authMiddleware, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    const receiverId = Number(req.params.receiverId);
    if (isNaN(receiverId)) return res.status(400).json({ message: "Invalid receiverId" });

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
    const messages = await Message.findAll({
        where: {
        [Op.or]: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
        ],
        },
        order: [["createdAt", "ASC"]],
    });

    res.json(messages);
    } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    res.status(500).json({ message: "Ошибка сервера" });
    }
});


router.get("/dialogs/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const dialogs = await Message.findAll({
        where: {
            [Op.or]: [
                { senderId: userId },
                { receiverId: userId },
            ],
        },
        order: [["createdAt", "DESC"]],
        include: [{ model: User, as: "sender", attributes: ["id", "username", "avatarImage"] }],
    });

    const typedDialogs = dialogs as unknown as MessageWithSender[];

    const uniqueChats: Record<number, any> = {};

    for (const msg of typedDialogs) {
        const otherId = msg.senderId === Number(userId) ? msg.receiverId : msg.senderId;

        if (!uniqueChats[otherId]) {
            uniqueChats[otherId] = {
                userId: otherId,
                username: msg.sender?.username || `user_${otherId}`,
                avatarImage: msg.sender?.avatarImage || "",
                lastMessage: msg.content,
                lastMessageTime: msg.createdAt,
            };
        }
    }

    res.json(Object.values(uniqueChats));
  } catch (error) {
    console.error("Ошибка при получении диалогов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.delete("/dialogs/:receiverId/:senderId", async (req, res) => {
  const id1 = Number(req.params.receiverId);
  const id2 = Number(req.params.senderId);

  if (isNaN(id1) || isNaN(id2)) {
    return res.status(400).json({ message: "Некорректные параметры ID" });
  }

  try {
    const deleted = await Message.destroy({
      where: {
        [Op.or]: [
          { senderId: id1, receiverId: id2 },
          { senderId: id2, receiverId: id1 }
        ]
      }
    });

    res.json({
      success: true,
      deletedCount: deleted,
      message: `Удалено ${deleted} сообщений между пользователями ${id1} и ${id2}`
    });
  } catch (error) {
    console.error("Ошибка при удалении диалогов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.delete("/dialogs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Некорректный параметр ID" });
    }

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({ message: "Сообщение не найдено" });
    }

    await message.destroy();

    return res.json({ message: "Сообщение успешно удалено" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка при удалении сообщения" });
  }
});

export default router;
