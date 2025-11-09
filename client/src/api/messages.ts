import axios from "axios";
import type { Dialog } from "../types";

export const getDialogs = async (): Promise<Dialog[]> => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const res = await axios.get<Dialog[]>(
      "http://localhost:5000/api/messages/dialogs/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Ошибка при получении диалогов:", err);
    return [];
  }
};

export const getMessages = async (receiverId: number) => {
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId")
  if (!token) return [];

  try {
    const res = await axios.get(`http://localhost:5000/api/messages/${currentUserId}/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Ошибка при получении сообщений:", err);
    return [];
  }
};

export const sendMessage = async (receiverId: number, content: string) => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await axios.post(
      "http://localhost:5000/api/messages",
      { receiverId, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Ошибка при отправке сообщения:", err);
    return null;
  }
};

export const deleteChat = async (receiverId: number) => {
  const currentUserId = Number(localStorage.getItem("userId"));
  if (!currentUserId) return [];

  try {
    console.log(`Удаляем сообщения из чата ${currentUserId} и ${receiverId}.`)
    const res = await axios.delete(`http://localhost:5000/api/messages/dialogs/${receiverId}/${currentUserId}`)
    
    console.log(`Сообщения из чата ${currentUserId} и ${receiverId} - удалены!`)
    return res.data;
  } catch (err) {
    console.error("Ошибка при удалении сообщений:", err);
    return [];
  }
}