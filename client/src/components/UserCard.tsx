import { useEffect, useState } from "react";
import { useAuthValue } from "../hooks/useAuth";
import axios from "axios";
import { UserCardSkeleton } from "./skeletons/UserCardSkeleton";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
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
        <div className="userCard flex center g8" onClick={() => navigate(`/profile/${user?.id}`)}>
            <div className="userAvatar"></div>
            <div className="textBox flex column">
                <p className="fullNameUser">
                {user?.firstname} {user?.lastname}
                </p>
                <p className="userName">us/{user?.username}</p>
            </div>
        </div>
    );
};
