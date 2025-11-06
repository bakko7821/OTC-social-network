import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { socket } from "../../socket";
import { MessageItem } from "./MessageItem";
import { getMessages } from "../../api/messages";
import type { MessageRecord } from "../../types";

export default function Messages({ receiverId }: { receiverId: number }) {
    const [messages, setMessages] = useState<MessageRecord[]>([]);

    useEffect(() => {
        if (!receiverId) return;

        const loadMessages = async () => {
            const data = await getMessages(receiverId);
            setMessages(data);
        };
        loadMessages();

        const handleMessage = (msg: MessageRecord) => {
            if (msg.senderId === receiverId || msg.receiverId === receiverId) {
            setMessages((prev) => [...prev, msg]);
            }
        };

        socket.on("private_message", handleMessage);

        return () => {
            socket.off("private_message", handleMessage);
        };
    }, [receiverId]);

    const currentUserId = Number(localStorage.getItem("userId"));

    return (
        <div className="flex column" style={{ flex: 1 }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((m) => (
                <div
                key={m.id}
                className="flex"
                style={{
                    justifyContent: m.senderId === currentUserId ? "flex-end" : "flex-start",
                    marginBottom: "6px",
                }}
                >
                <div
                    style={{
                    background: m.senderId === currentUserId ? "#d2f2ff" : "#eee",
                    padding: "8px 12px",
                    borderRadius: "14px",
                    maxWidth: "60%",
                    }}
                >
                    <MessageItem key={m.id} message={m} isOwn={m.senderId === currentUserId} />
                </div>
                </div>
            ))}
            </div>
            <MessageInput receiverId={receiverId} />
        </div>
    );
}
