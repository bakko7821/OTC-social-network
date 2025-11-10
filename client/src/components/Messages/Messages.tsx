import { useEffect, useState, useCallback, useRef } from "react";
import { MessageInput } from "./MessageInput";
import { socket } from "../../socket";
import { MessageItem } from "./MessageItem";
import type { MessageRecord } from "../../types";
import { getMessages } from "../../api/messages";
import { MessageHeader } from "./MessageHeader/MessageHeader";

export default function Messages({ receiverId }: { receiverId: number }) {
  console.log("Messages mounted");

  const [editingMessage, setEditingMessage] = useState<null | {
    id: number;
    content: string;
  }> (null);

  const handleEditMessage = (message: { id: number; content: string }) => {
    setEditingMessage(message);
  };

  const handleSaveEditedMessage = async (id: number, newContent: string) => {
    console.log(id)
    await fetch(`http://localhost:5000/api/messages/dialogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });

    setMessages(prev => prev.map(m => m.id === id ? { ...m, content: newContent } : m));

    setEditingMessage(null);

    socket.emit("update_message", { id, content: newContent });
  };

  const handleSendMessage = (content: string) => {
    socket.emit("private_message", { receiverId, content });
    const userIdStr = localStorage.getItem("userId");
    const userId = userIdStr ? Number(userIdStr) : 0; // например 0 если нет id

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        senderId: userId,
        receiverId: receiverId,
        content,
        createdAt: new Date().toISOString(),
      }
    ]);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);  // сбрасываем редактируемое сообщение
  };

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

  const handleDeleteMessage = async (id: number) => {
    await fetch(`http://localhost:5000/api/messages/dialogs/${id}`, {
      method: "DELETE",
    });

    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="messagesBox flex column">
      <MessageHeader receiverId={receiverId}/>
        <div className="messagesContent">
            {messages.map((m) => (
                <MessageItem
                    key={m.id}
                    message={m}
                    isOwn={m.senderId === currentUserId}
                    onDelete={handleDeleteMessage}
                    onEdit={handleEditMessage}
                />
                ))}
            <div ref={messagesEndRef} />
        </div>
      <MessageInput
        receiverId={receiverId}
        onSend={handleSendMessage}
        editingMessage={editingMessage}
        onSaveEdit={handleSaveEditedMessage}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}
