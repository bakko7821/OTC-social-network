import { io, server } from "./app";
import { sequelize } from "./config/db";
import User from "./models/User";
import Message from "./models/Message";
import { Server } from "socket.io";

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
  const userId = socket.handshake.auth?.userId;
  if (!userId) return;

  console.log(`Пользователь ${userId} подключился`);

  socket.join(userId.toString());

  socket.on("private_message", async ({ receiverId, content }) => {
    try {
      const message = await Message.create({
        senderId: userId,
        receiverId,
        content,
      });

      // Отправляем только участникам диалога
      io.to(receiverId.toString()).emit("private_message", message);
      io.to(userId.toString()).emit("private_message", message);
    } catch (err) {
      console.error("Ошибка при отправке сообщения:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Пользователь ${userId} отключился`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
