import server from "./app";
import { sequelize } from "./config/db";
import { Server } from "socket.io";
import User from "./models/User";

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models synchronized");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  const userId = socket.handshake.auth?.userId;
  if (!userId) return;

  try {
    console.log("Socket connected:", socket.id, "userId:", userId);
    socket.on("join_room", (roomId: string) => {
      socket.join(roomId);
      console.log(`user ${userId} joined room ${roomId}`);
    });

    await User.update({ online: true }, { where: { id: userId } });
    io.emit("user_online", { userId });
    console.log(`Пользователь ${userId} онлайн`);
  } catch (err) {
    console.error("Ошибка при обновлении online:", err);
  }

  socket.on("disconnect", async () => {
    try {
      console.log("Socket connected:", socket.id, "userId:", userId);
      await User.update({ online: false }, { where: { id: userId } });
      io.emit("user_offline", { userId });
      console.log(`Пользователь ${userId} оффлайн`);
    } catch (err) {
      console.error("Ошибка при обновлении offline:", err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
