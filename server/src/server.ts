import { io, server } from "./app";
import { sequelize } from "./config/db";
import User from "./models/User";
import Message from "./models/Message";
import { Server } from "socket.io";

const onlineUsers = new Map<number, number>();

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models synchronized");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  const userId = Number(socket.handshake.auth?.userId);
  if (!userId) return;

  console.log(`Пользователь ${userId} подключился`);

  // добавляем или увеличиваем счетчик подключений
  const connections = (onlineUsers.get(userId) || 0) + 1;
  onlineUsers.set(userId, connections);

  // если это первое подключение — ставим online = true
  if (connections === 1) {
    User.update({ online: true }, { where: { id: userId } });
    console.log(`Пользователь ${userId} стал online`);
  }

  socket.join(userId.toString());

  // обработка личных сообщений
  socket.on("private_message", async ({ receiverId, content }) => {
    try {
      const message = await Message.create({
        senderId: userId,
        receiverId,
        content,
      });

      io.to(receiverId.toString()).emit("private_message", message);
      io.to(userId.toString()).emit("private_message", message);
    } catch (err) {
      console.error("Ошибка при отправке сообщения:", err);
    }
  });

  // обработка отключения
  socket.on("disconnect", async () => {
    console.log(`Пользователь ${userId} отключился`);

    const remaining = (onlineUsers.get(userId) || 1) - 1;
    if (remaining <= 0) {
      onlineUsers.delete(userId);
      await User.update({ online: false }, { where: { id: userId } });
      console.log(`Пользователь ${userId} стал offline`);
    } else {
      onlineUsers.set(userId, remaining);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
