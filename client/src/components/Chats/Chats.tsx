import { useEffect, useState } from "react";
import { ChatsHeader } from "./ChatsHeader";
import { socket } from "../../socket";
import { getDialogs } from "../../api/messages";
import type { Dialog, SocketMessage, User } from "../../types";
import defaultAvatar from "../../assets/images/58e8ff52eb97430e819064cf.png"
import "../../styles/chats.scss"

interface ChatsProps {
  onSelect: (user: User) => void;
}

export default function Chats({ onSelect }: ChatsProps) {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

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
            const tempDialog: Dialog = {
                userId: otherId, // id того, с кем диалог
                username: userFromMsg?.username ?? `Пользователь ${otherId}`,
                firstname: userFromMsg?.firstname,
                lastname: userFromMsg?.lastname,
                avatarImage: userFromMsg?.avatarImage ?? "",
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

    const handleSelect = (user: User) => {
        console.log(user.username);
        const newDialog: Dialog = {
            userId: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            avatarImage: user.avatarImage,
            online: user.online,
            lastMessage: "",
            lastMessageTime: new Date().toISOString(),
        };

        setDialogs((prev) => [newDialog, ...prev]); // добавляем в начало списка
        onSelect(user); // пробрасываем наверх, если нужно
    };

    const selectChat = (dialog: Dialog) => {
        setActiveChatId(dialog.userId);
        onSelect({
            id: dialog.userId,
            username: dialog.username || "",
            firstname: dialog.firstname || "",
            lastname: dialog.lastname || "",
            phoneNumber: "",
            avatarImage: dialog.avatarImage,
            email: "",
            description: "",
            headImage: "",
            online: dialog.online || false})
    }


    console.log("Chats render");

  return (
    <div>
        <ChatsHeader onSelectUser={handleSelect} />
        {dialogs
            .slice() // создаём копию, чтобы не мутировать state напрямую
            .sort((a, b) => {
                const timeA = new Date(a.lastMessageTime).getTime();
                const timeB = new Date(b.lastMessageTime).getTime();
                return timeB - timeA;
            })
            .map((d) => (
            <div 
                key={d.userId} 
                onClick={() =>
                    selectChat(d)
                } 
                className={d.userId === activeChatId ? "chatCard active flex g8" : "chatCard flex g8"}
            >
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
