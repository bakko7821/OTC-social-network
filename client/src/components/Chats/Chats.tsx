import { useEffect, useState } from "react";
import { ChatsHeader } from "./ChatsHeader";
import { socket } from "../../socket";
import { getDialogs } from "../../api/messages";
import type { Dialog, SocketMessage, User } from "../../utils/types";
import defaultAvatar from "../../assets/images/58e8ff52eb97430e819064cf.png"
import "../../styles/chats.scss"
import axios from "axios";

interface ChatsProps {
  onSelect: (user: User) => void;
}

export default function Chats({ onSelect }: ChatsProps) {
    const currentUserId = Number(localStorage.getItem("userId"))
    console.log(currentUserId)

    const [dialogs, setDialogs] = useState<Dialog[]>([]);
    const [activeChatId, setActiveChatId] = useState<number | null>(null);

    useEffect(() => {
        const handleUserOnline = ({ userId }: { userId: number }) => {
            setDialogs(prev =>
            prev.map(d =>
                d.user.id === userId
                ? { ...d, user: { ...d.user, online: true } }
                : d
            )
            );
        };

        const handleUserOffline = ({ userId }: { userId: number }) => {
            setDialogs(prev =>
            prev.map(d =>
                d.user.id === userId
                ? { ...d, user: { ...d.user, online: false } }
                : d
            )
            );
        };

        socket.on("user_online", handleUserOnline);
        socket.on("user_offline", handleUserOffline);

        return () => {
            socket.off("user_online", handleUserOnline);
            socket.off("user_offline", handleUserOffline);
        };
    }, []);

    async function fetchUser(id:number) {
        if (!id) return

        try {
            const res = axios.get(`http://localhost:5000/api/users/${id}`)
            return (await res).data
        } catch (error: unknown) {
            console.error(error + "Не удалось выполнить запрос")
        }
    }

    useEffect(() => {
        const loadDialogs = async () => {
            const data = await getDialogs();
            setDialogs(data);
        };

        loadDialogs();

        const handleIncoming = async (msg: SocketMessage) => {
            const isMyMessage = msg.senderId === currentUserId;
            const otherId = isMyMessage ? msg.receiverId : msg.senderId;

            const userFromMsg = await fetchUser(otherId);

            setDialogs(prev => {
                const existing = prev.find(d => d.user.id === otherId);

                if (existing) {
                    return prev.map(d =>
                        d.user.id === otherId
                            ? {
                                ...d,
                                lastMessage: msg.content,
                                lastMessageTime: msg.createdAt
                            }
                            : d
                    );
                }

                const newDialog: Dialog = {
                    user: userFromMsg,
                    lastMessage: msg.content,
                    lastMessageTime: msg.createdAt,
                };

                return [newDialog, ...prev];
            });
        };

        socket.on("private_message", handleIncoming);

        return () => {
            socket.off("private_message", handleIncoming);
        };
    }, []);

    const handleSelect = (user: User) => {
        const newDialog: Dialog = {
            user,
            lastMessage: "",
            lastMessageTime: new Date().toISOString(),
        };

        setDialogs((prev) => [newDialog, ...prev]);
        onSelect(user);
    };

    const selectChat = (dialog: Dialog) => {
        setActiveChatId(dialog.user.id);

        onSelect(dialog.user);
    };

    console.log("Chats render");
    console.log(dialogs)

  return (
    <>
        <ChatsHeader onSelectUser={handleSelect} />
        {dialogs
            .slice()
            .sort((a, b) => {
                const timeA = new Date(a.lastMessageTime).getTime();
                const timeB = new Date(b.lastMessageTime).getTime();
                return timeB - timeA;
            })
            .map((d) => {
            if (!d.user) return null;
            return (
                <div 
                    key={d.user.id} 
                    onClick={() =>
                        selectChat(d)
                    } 
                    className={d.user.id === activeChatId ? "chatCard active flex g8" : "chatCard flex g8"}
                >
                    <div className="userAvatar flex g8">
                        <img
                        src={d.user.avatarImage ? `http://localhost:5000${d.user.avatarImage}` : defaultAvatar}
                        alt={d.user.username || "Пользователь"}
                        />
                        {d.user.online && <span className="online-dot" />}
                    </div>
                    <div className="chatCardInfo flex center column">
                        <div className="chatCardInfoHeader flex between">
                            <span className="fullname">
                                {d.user.firstname || d.user.lastname
                                ? `${d.user.firstname ?? ""} ${d.user.lastname ?? ""}`.trim()
                                : d.user.username || "Без имени"}
                            </span>
                            <span className="lastMessageDate">
                                {d.lastMessageTime
                                ? new Date(d.lastMessageTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                : ""}
                            </span>
                        </div>
                        <span className="chatCardInfoContent">
                            {d.lastMessage
                                ? (d.user.id === currentUserId ? `Вы: ${d.lastMessage}` : d.lastMessage)
                                : ""}
                        </span>
                    </div>
                </div>
            )
        })}

    </>
  );
}
