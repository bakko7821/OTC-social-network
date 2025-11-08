import { useEffect, useState, useCallback, useRef } from "react";
import MessageInput from "./MessageInput";
import { socket } from "../../socket";
import { MessageItem } from "./MessageItem";
import type { MessageRecord } from "../../types";
import { getMessages } from "../../api/messages";
import { MessageHeader } from "./MessageHeader/MessageHeader";

export default function Messages({ receiverId }: { receiverId: number }) {
  console.log("Messages mounted");

  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const currentUserId = Number(localStorage.getItem("userId"));
  const isFetching = useRef(false);

  const loadMessages = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const data = await getMessages(receiverId);
      setMessages(data);
    } catch (err) {
      console.error("Ошибка загрузки сообщений:", err);
    } finally {
      isFetching.current = false;
    }
  }, [receiverId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleMessage = useCallback(
    (msg: MessageRecord) => {
      if (msg.senderId === receiverId || msg.receiverId === receiverId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev; // защита от дублей
          return [...prev, msg];
        });
      }
    },
    [receiverId]
  );

    useEffect(() => {
        socket.on("private_message", handleMessage);
        console.log("Добавлен слушатель для private_message");

        return () => {
            socket.off("private_message", handleMessage);
            console.log("Удалён слушатель для private_message");
        };
    }, [handleMessage]);

    console.log("Messages render, receiverId:", receiverId);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

  return (
    <div className="messagesBox flex column">
      <MessageHeader receiverId={receiverId} />
        <div className="messagesContent">
            {messages.map((m) => (
                <MessageItem
                    key={m.id}
                    message={m}
                    isOwn={m.senderId === currentUserId}
                />
                ))}
            <div ref={messagesEndRef} />
        </div>
      <MessageInput receiverId={receiverId}/>
    </div>
  );
}
