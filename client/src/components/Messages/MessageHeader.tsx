import { useEffect, useState } from "react";
import type { User } from "../../types";
import axios, { AxiosError } from "axios";
import { InfoIcon, MoreIcon, SearchIcon } from "../../assets/Icons";

interface Props {
  receiverId: number;
}

export const MessageHeader = ({ receiverId }: Props) => {
    console.log("MessageHeader receiverId:", receiverId);
    const [ user, setUser ] = useState<User | null>(null)
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get<User>(`http://localhost:5000/api/users/${receiverId}`)

                setUser(res.data);
            } catch (err) {
                const error = err as AxiosError<{ message?: string }>;
                console.error(error.response?.data?.message || "Ошибка при получении данных пользователя");
            }
        };

        fetchUser();
    }, [receiverId])
    
    return (
        <div className="messageHeader flex between">
            <div className="textBox flex column">
                <span className="fullname">{user?.firstname} {user?.lastname}</span>
                <span className={user?.online ? "onlineStatus active" : "onlineStatus"}>
                    {user?.online ? "В сети" : "Не в сети"}
                </span>
            </div>
            <nav className="flex">
                <button><SearchIcon /></button>
                <button><InfoIcon /></button>
                <button><MoreIcon /></button>
            </nav>
        </div>
    )
}