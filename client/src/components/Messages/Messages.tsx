import { useEffect, useState, useCallback, useRef } from "react";
import MessageInput from "./MessageInput";
import { socket } from "../../socket";
import { MessageItem } from "./MessageItem";
import type { Message, MessageRecord } from "../../types";
import { getMessages } from "../../api/messages";
import { MessageHeader } from "./MessageHeader/MessageHeader";
import "../../styles/messages.scss"
import axios from "axios";

export interface MessagesProps {
  receiverId: number;
  onCloseChat: () => void
  onOpenProfile: () => void;
}

export const Messages: React.FC<MessagesProps> = ({receiverId, onCloseChat, onOpenProfile}) => {
  console.log("Messages mounted");

  const token = localStorage.getItem("token");

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
  
  const handleDeleteMessage = async (message: Message) => {
    try {
      await fetch(`http://localhost:5000/api/messages/dialogs/${message.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Эмитим событие, сервер удалит и разошлёт другим
      socket.emit("message_deleted", {
        id: message.id,
        senderId: message.senderId,
        receiverId: message.receiverId
      });

      // Можно сразу удалить локально, чтобы быстрее обновилось UI
      setMessages(prev => prev.filter(m => m.id !== message.id));

    } catch (err) {
      console.error(err);
    }
  };

  const handleEditMessage = async (message: Message, editContent: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/messages/dialogs/${message.id}`,
        { content: editContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, content: editContent } : m
        )
      );

      socket.emit("message_updated", {
        id: message.id,
        content: editContent,
        receiverId: message.receiverId,
        senderId: message.senderId,
      });

      console.log(`Сообщение с ID: ${message.id} изменено на "${editContent}"`);
    } catch (error) {
      console.error("Ошибка при изменении сообщения:", error);
    }
  };

  useEffect(() => {
    const handleUpdatedMessage = (updatedMsg: MessageRecord) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === updatedMsg.id ? { ...m, content: updatedMsg.content } : m
        )
      );
    };

    socket.on("message_updated", handleUpdatedMessage);

    return () => {
      socket.off("message_updated", handleUpdatedMessage);
    };
  }, []);

  useEffect(() => {
    const handleDeletedMessage = (deletedId: number) => {
      setMessages(prev => prev.filter(m => m.id !== deletedId));
    };
    
    socket.on("message_deleted", handleDeletedMessage);

    return () => {
      socket.off("message_deleted", handleDeletedMessage);
    };
}, []);


  return (
    <div className="messagesBox flex column">
      <MessageHeader receiverId={receiverId} onOpenProfile={onOpenProfile} onCloseChat={onCloseChat}/>
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
      <MessageInput receiverId={receiverId}/>
    </div>
  );
}
