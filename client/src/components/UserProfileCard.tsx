import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { InfoIcon, LocationIcon } from "../Icons/Icons";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  description: string;
  location: string;
  email: string;
  createdAt: string;
}

export const UserProfileCard = () => {
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

    // if (!user) return <UserCardSkeleton />;

    return (
        <div className="userProfileCard flex colum">
            <img src="" alt="" className="headImage" />
            <div className="userInfo flex">
                <div className="userAvatar"></div>
                <div className="textBox">
                    <p className="fullNameUser">{user?.firstname} {user?.lastname}</p>
                    <p className="userDescription">{user?.description}</p>
                    <div className="infoBox">
                        <p className="userNameBox">us/{user?.username}</p>
                        <div className="locationBox">
                            <LocationIcon />
                            {user?.location}
                        </div>
                        <button className="moreUserInfo">
                            <InfoIcon />
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}