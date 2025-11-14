import { io, server } from "./app";
import { sequelize } from "./config/db";
import User from "./models/User";
import Message from "./models/Message";

const onlineUsers = new Map<number, number>();

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
})();

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  const userId = Number(socket.handshake.auth?.userId);
  if (!userId) {
    socket.disconnect();
    return;
  }

  console.log(`Пользователь ${userId} подключился`);

  const connections = (onlineUsers.get(userId) || 0) + 1;
  onlineUsers.set(userId, connections);

  if (connections === 1) {
    User.update({ online: true }, { where: { id: userId } });
    console.log(`Пользователь ${userId} стал online`);

    socket.broadcast.emit("user_online", { userId });
  }

  socket.join(userId.toString());

  socket.on("private_message", async ({ receiverId, content }) => {
      const message = await Message.create({
          senderId: userId,
          receiverId,
          content,
      });

      const sender = await User.findByPk(userId);
      const receiver = await User.findByPk(receiverId);

      const enrichedMessage = {
          ...message.toJSON(),
          sender,
          receiver
      };

      io.to(receiverId.toString()).emit("private_message", enrichedMessage);
      io.to(userId.toString()).emit("private_message", enrichedMessage);
  });

  socket.on("message_updated", async ({ id, content }) => {
    try {
      const message = await Message.findByPk(id);

      if (!message) return console.warn(`Сообщение ${id} не найдено`);

      if (message.senderId !== userId) {
        console.warn(`Пользователь ${userId} не может редактировать чужое сообщение`);
        return;
      }

      message.content = content;
      await message.save();

      io.to(message.senderId.toString()).emit("message_updated", message);
      io.to(message.receiverId.toString()).emit("message_updated", message);

      console.log(`Сообщение ${id} обновлено пользователем ${userId}`);
    } catch (err) {
      console.error("Ошибка при обновлении сообщения:", err);
    }
  });

  socket.on("message_deleted", async ({ id, senderId, receiverId }) => {
    try {

      io.to(senderId.toString()).emit("message_deleted", id);
      io.to(receiverId.toString()).emit("message_deleted", id);

      console.log(`Сообщение ${id} удалено`);
    } catch (err) {
      console.error("Ошибка при удалении сообщения:", err);
    }
  });

  socket.on("disconnect", async () => {
    console.log(`Пользователь ${userId} отключился`);

    const remaining = (onlineUsers.get(userId) || 1) - 1;
    if (remaining <= 0) {
      onlineUsers.delete(userId);
      await User.update({ online: false }, { where: { id: userId } });
      console.log(`Пользователь ${userId} стал offline`);

      socket.broadcast.emit("user_offline", { userId });
    } else {
      onlineUsers.set(userId, remaining);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
