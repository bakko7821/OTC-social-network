import express, { Request, Response } from "express";
import FriendRequest from "../modules/FriendRequests";
import { Friend } from "../modules";

const router = express.Router();

router.post("/request", async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (senderId === receiverId) {
    return res.status(400).json({ message: "Нельзя добавить самого себя" });
  }

  const existingRequest = await FriendRequest.findOne({
    where: { senderId, receiverId, status: "pending" },
  });

  if (existingRequest) {
    return res.status(400).json({ message: "Заявка уже отправлена" });
  }

  await FriendRequest.create({ senderId, receiverId });
  res.status(201).json({ message: "Заявка отправлена" });
});

router.post("/accept", async (req, res) => {
  const { requestId } = req.body;

  const request = await FriendRequest.findByPk(requestId);
  if (!request || request.status !== "pending") {
    return res.status(404).json({ message: "Заявка не найдена" });
  }

  request.status = "accepted";
  await request.save();

  await Friend.create({ userId: request.senderId, friendId: request.receiverId });
  await Friend.create({ userId: request.receiverId, friendId: request.senderId });

  res.json({ message: "Заявка принята" });
});

router.post("/reject", async (req, res) => {
  const { requestId } = req.body;

  const request = await FriendRequest.findByPk(requestId);
  if (!request || request.status !== "pending") {
    return res.status(404).json({ message: "Заявка не найдена" });
  }

  request.status = "rejected";
  await request.save();

  res.json({ message: "Заявка отклонена" });
});


export default router;