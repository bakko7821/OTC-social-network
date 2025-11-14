import { useEffect, useState } from "react";
import type { User } from "../../../types";
import axios, { AxiosError } from "axios";
import { BackIcon, InfoIcon, MoreIcon, SearchIcon } from "../../../assets/Icons";
import { MoreDropDownMenu } from "./MoreDropDownMenu";
import { SearchInput } from "./SearchInput";
import type { MessagesProps } from "../Messages";
import { socket } from "../../../socket"; // импорт твоего socket

export const MessageHeader: React.FC<MessagesProps> = ({ receiverId, onCloseChat, onOpenProfile }) => {
    const [dropDownStatus, setDropDownStatus] = useState(false);
    const [dropDownSearch, setDropDownSearch] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // загрузка пользователя один раз
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get<User>(`http://localhost:5000/api/users/${receiverId}`);
                setUser(res.data);
            } catch (err) {
                const error = err as AxiosError<{ message?: string }>;
                console.error(error.response?.data?.message || "Ошибка при получении данных пользователя");
            }
        };
        fetchUser();
    }, [receiverId]);

    // подписка на live обновление онлайн-статуса
    useEffect(() => {
        const handleUserOnline = ({ userId }: { userId: number }) => {
            if (userId === receiverId) {
                setUser(prev => prev ? { ...prev, online: true } : prev);
            }
        };

        const handleUserOffline = ({ userId }: { userId: number }) => {
            if (userId === receiverId) {
                setUser(prev => prev ? { ...prev, online: false } : prev);
            }
        };

        socket.on("user_online", handleUserOnline);
        socket.on("user_offline", handleUserOffline);

        return () => {
            socket.off("user_online", handleUserOnline);
            socket.off("user_offline", handleUserOffline);
        };
    }, [receiverId]);

    const handleCloseMenu = () => {
        setDropDownStatus(false);
        setDropDownSearch(false);
    };

    return (
        <div className="messageHeader flex between">
            <div className="leftBox flex center g8">
                <button className="backButton" onClick={onCloseChat}><BackIcon /></button>
                <div className="textBox flex column">
                    <span className="fullname">{user?.firstname} {user?.lastname}</span>
                    <span className={user?.online ? "onlineStatus active" : "onlineStatus"}>
                        {user?.online ? "В сети" : "Не в сети"}
                    </span>
                </div>
            </div>
            <nav className="messageHeaderNavigate flex">
                <button onClick={() => setDropDownSearch(prev => !prev)}><SearchIcon /></button>
                <button onClick={onOpenProfile}><InfoIcon /></button>
                <button onClick={() => setDropDownStatus(prev => !prev)}><MoreIcon /></button>
            </nav>

            {dropDownSearch && <SearchInput onClose={handleCloseMenu} />}
            {dropDownStatus && <MoreDropDownMenu receiverId={receiverId} />}
        </div>
    );
};
