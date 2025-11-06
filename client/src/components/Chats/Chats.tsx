import { useEffect, useState } from "react";
import { ChatsHeader } from "./ChatsHeader";
import { socket } from "../../socket";
import { getDialogs } from "../../api/messages";
import type { Dialog, SocketMessage } from "../../types";
import defaultAvatar from "../../assets/images/58e8ff52eb97430e819064cf.png"

export default function Chats({ onSelect }: { onSelect: (userId: number) => void }) {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

    useEffect(() => {
        const loadDialogs = async () => {
            const data = await getDialogs();
            setDialogs(data);
        };

        loadDialogs();

        const currentUserId = Number(localStorage.getItem("userId"));

        const handleIncoming = async (msg: SocketMessage) => {
            const isMyMessage = msg.senderId === currentUserId;
            const otherId = isMyMessage ? msg.receiverId : msg.senderId;

            // пробуем найти уже существующий диалог
            setDialogs((prev) => {
            const existing = prev.find((d) => d.userId === otherId);
            const messageText = isMyMessage ? `Вы: ${msg.content}` : msg.content;

            if (existing) {
                return prev.map((d) =>
                d.userId === otherId
                    ? { ...d, lastMessage: messageText, lastMessageTime: msg.createdAt }
                    : d
                );
            } else {
                // Если нет диалога — создаем временный с минимумом данных
                const tempDialog: Dialog = {
                userId: otherId,
                username: isMyMessage
                    ? msg.receiver?.username || `Пользователь ${otherId}`
                    : msg.sender?.username || `Пользователь ${otherId}`,
                avatarImage: isMyMessage
                    ? msg.receiver?.avatarImage || ""
                    : msg.sender?.avatarImage || "",
                lastMessage: messageText,
                lastMessageTime: msg.createdAt,
                };

                return [tempDialog, ...prev];
            }
            });

            // если нет данных о пользователе, можно подгрузить их с API (пример ниже)
            // if (!msg.receiver && !msg.sender) {
            //   const user = await getUserById(otherId);
            //   setDialogs((prev) =>
            //     prev.map((d) =>
            //       d.userId === otherId
            //         ? { ...d, username: user.username, avatarImage: user.avatarImage }
            //         : d
            //     )
            //   );
            // }
        };

        socket.on("private_message", handleIncoming);

        return () => {
            socket.off("private_message", handleIncoming);
        }
    }, []);

  return (
    <div>
        <ChatsHeader />
        {dialogs.map((d) => (
        <div key={d.userId} onClick={() => onSelect(d.userId)} className="chatCard flex g8">
            <img
                src={d.avatarImage || defaultAvatar}
                alt={d.username || "Пользователь"}
            />
            <div className="chatCardInfo flex center column g4">
                <div className="chatCardInfoHeader flex between">
                    <span className="fullname">{d.username || "Без имени"}</span>
                    <span className="lastMessageDate">
                        {d.lastMessageTime ? new Date(d.lastMessageTime).toLocaleTimeString() : ""}
                    </span>
                </div>
                <span className="chatCardInfoContent">
                    {d.lastMessage ? (d.lastMessage.length > 30 ? d.lastMessage.slice(0, 30) + "..." : d.lastMessage) : ""}
                </span>
            </div>
        </div>
        ))}
    </div>
  );
}
