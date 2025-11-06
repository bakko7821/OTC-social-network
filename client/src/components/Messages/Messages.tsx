import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { socket } from "../../socket";
import { MessageItem } from "./MessageItem";
import type { MessageRecord } from "../../types";
import { getMessages } from "../../api/messages";

export default function Messages({ receiverId }: { receiverId: number }) {
    console.log("Messages mounted")
    const [messages, setMessages] = useState<MessageRecord[]>([]);

    useEffect(() => {
        if (!receiverId) return;

        let isMounted = true;

        const loadMessages = async () => {
        try {
            const data = await getMessages(receiverId);
            if (isMounted) setMessages(data);
        } catch (err) {
            console.error("Ошибка загрузки сообщений:", err);
        }
        };

        loadMessages();

        const handleMessage = (msg: MessageRecord) => {
        // Показываем только если сообщение относится к этому чату
        if (msg.senderId === receiverId || msg.receiverId === receiverId) {
            setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev; // защита от дублей
            return [...prev, msg];
            });
        }
        };

        console.log("Добавляем слушатель для private_message");
        socket.on("private_message", handleMessage);

        return () => {
        isMounted = false;
        console.log("Удаляем слушатель");
        socket.off("private_message", handleMessage);
        };
    }, [receiverId]);

    console.log("Messages render, receiverId:", receiverId);

    useEffect(() => {
        console.log("Messages useEffect executed");
        return () => console.log("Messages unmounted");
    }, []);

    const currentUserId = Number(localStorage.getItem("userId"));

    return (
        <div className="messagesBox flex column ">
            <div className="messagesContent flex column">
                {messages.map((m) => (
                    <MessageItem key={m.id} message={m} isOwn={m.senderId === currentUserId} />
                ))}
            </div>
            <MessageInput receiverId={receiverId} />
        </div>
    );
}
