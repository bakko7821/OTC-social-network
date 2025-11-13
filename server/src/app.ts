import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRouters from "./routes/auth";
import usersRouters from "./routes/users";
import messagesRouters from "./routes/messages";
import uploadRoutes from "./routes/upload";

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouters);
app.use("/api/users", usersRouters);
app.use("/api/messages", messagesRouters);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Socket.IO обработчик
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

connectDB();

export { app, server };
