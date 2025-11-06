import { useEffect, useState } from "react";
import { ChatsHeader } from "./ChatsHeader";
import { socket } from "../../socket";
import { getDialogs } from "../../api/messages";
import type { Dialog, SocketMessage } from "../../types";

export default function Chats({ onSelect }: { onSelect: (userId: number) => void }) {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

    useEffect(() => {
        const loadDialogs = async () => {
            const data = await getDialogs();
            console.log("Диалоги с сервера:", data);
            setDialogs(data);
        };

        loadDialogs();

        const handleIncoming = (msg: SocketMessage) => {
            setDialogs((prev) => {
                const existing = prev.find(
                (d) => d.userId === msg.senderId || d.userId === msg.receiverId
                );
                if (existing) {
                return prev.map((d) =>
                    d.userId === existing.userId
                    ? { ...d, lastMessage: msg.content, lastMessageTime: msg.createdAt }
                    : d
                );
                } else {
                return [
                    {
                    userId: msg.senderId,
                    username: msg.sender?.username || "Новый пользователь",
                    avatarImage: msg.sender?.avatarImage || "",
                    lastMessage: msg.content,
                    lastMessageTime: msg.createdAt,
                    },
                    ...prev,
                ];
                }
            });
        };

        socket.on("private_message", handleIncoming);

        return () => {
        socket.off("private_message", handleIncoming);
        };
    }, []);

  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
        <ChatsHeader />
        {dialogs.map((d) => (
            <div
                key={d.userId}
                className="flex g10"
                style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
            }}
                onClick={() => onSelect(d.userId)}
            >
            <img
                src={d.avatarImage || "/default-avatar.png"}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <div className="flex column between" style={{ flex: 1 }}>
                <div className="flex between">
                    <span style={{ fontWeight: 600 }}>{d.username}</span>
                    <span style={{ fontSize: "12px", color: "#999" }}>
                    {new Date(d.lastMessageTime).toLocaleTimeString()}
                    </span>
                </div>
                    <span style={{ fontSize: "14px", color: "#666" }}>
                        {d.lastMessage?.length > 30 ? d.lastMessage.slice(0, 30) + "..." : d.lastMessage}
                    </span>
                </div>
            </div>
        ))}
    </div>
  );
}
