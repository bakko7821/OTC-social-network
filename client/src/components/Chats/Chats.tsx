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

        const userFromMsg =
        (msg.sender && msg.senderId === otherId && msg.sender) ||
        (msg.receiver && msg.receiverId === otherId && msg.receiver) ||
        undefined;

        const messageText = isMyMessage ? `Вы: ${msg.content}` : msg.content;

        setDialogs((prev) => {
        const existing = prev.find((d) => d.userId === otherId);

        if (existing) {
            return prev.map((d) =>
            d.userId === otherId
                ? {
                    ...d,
                    lastMessage: messageText,
                    lastMessageTime: msg.createdAt,
                    username: userFromMsg?.username ?? d.username,
                    avatarImage: userFromMsg?.avatarImage ?? d.avatarImage,
                }
                : d
            );
        } else {
            const usernameFallback = `Пользователь ${otherId}`;
            const tempDialog: Dialog = {
            userId: otherId,
            username: (userFromMsg?.username) ?? usernameFallback,
            avatarImage: (userFromMsg?.avatarImage) ?? "",
            lastMessage: messageText,
            lastMessageTime: msg.createdAt,
            };

            return [tempDialog, ...prev];
        }
        });
        };


        socket.on("private_message", handleIncoming);

        return () => {
            socket.off("private_message", handleIncoming);
        }
    }, []);

    console.log("Chats render");

  return (
    <div>
        <ChatsHeader />
        {dialogs.map((d) => (
        <div key={d.userId} onClick={() => onSelect(d.userId)} className="chatCard flex g8">
            <div className="userAvatar flex g8">
                <img
                    src={d.avatarImage || defaultAvatar}
                    alt={d.username || "Пользователь"}
                />
                {d.online && <span className="online-dot" />}
            </div>
            <div className="chatCardInfo flex center column">
                <div className="chatCardInfoHeader flex between">
                    <span className="fullname">
                    {d.firstname || d.lastname
                        ? `${d.firstname ?? ""} ${d.lastname ?? ""}`.trim()
                        : d.username || "Без имени"}
                    </span>
                    <span className="lastMessageDate">
                        {d.lastMessageTime
                            ? new Date(d.lastMessageTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                            : ""}
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
