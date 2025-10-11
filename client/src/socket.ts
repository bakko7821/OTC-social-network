import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");

export const socket = io("http://localhost:5000", {
  auth: { userId: userId },
});

socket.on("connect", () => console.log("Connected:", socket.id));
socket.on("connect_error", (err) => console.error("Socket error:", err));
