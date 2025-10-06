import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", routes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

connectDB();

export default server;
