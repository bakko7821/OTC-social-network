import { useEffect, useState } from "react";
import { useAuthValue } from "../hooks/useAuth";
import axios from "axios";
import { UserCardSkeleton } from "./skeletons/UserCardSkeleton";
import { useNavigate } from "react-router-dom";
import { MonkeyIcon } from "../Icons/Icons";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  avatarImage: string;
  createdAt: string;
}

export const UserCard = () => {
    const {setIsAuth } = useAuthValue();
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios
            .get<User>("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
            setUser(res.data);
            })
            .catch((err) => {
            console.error("Ошибка при получении пользователя:", err);

            localStorage.removeItem("token");
            setIsAuth(false);
            });
    }, []);

    if (!user) return <UserCardSkeleton />;

    return (
        <div className="userCard flex center g8" onClick={() => navigate(`/profile/me`)}>
            <div className="userAvatar flex center">
                {user?.avatarImage ? (
                    <img src={user?.avatarImage} alt="" />
                ) : (
                    <MonkeyIcon />
                )}
            </div>
            <div className="textBox flex column">
                <p className="fullNameUser">
                {user?.firstname} {user?.lastname}
                </p>
                <p className="userName">@{user?.username}</p>
            </div>
        </div>
    );
};
