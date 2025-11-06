import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  auth: {
    userId: Number(localStorage.getItem("userId")),
  },
});
