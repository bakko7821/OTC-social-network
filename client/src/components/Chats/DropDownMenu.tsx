import { useNavigate } from "react-router-dom";
import { SwitchTheme } from "./SwitchTheme";
import { CrossIcon, LogOutIcon, ProfileIcon } from "../../assets/Icons";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import defaultAvatar from "../../assets/images/58e8ff52eb97430e819064cf.png"
import type { DropDownMenuProps, User } from "../../utils/types";
import { UserProfileAlert } from "../Messages/MessageHeader/UserProfileAlert";

export const DropDownMenu = ({ onClose }: DropDownMenuProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [dropDownProfile ,setDropDownProfile] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await axios.get<User>("http://localhost:5000/api/users/me", {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data);
            } catch (err) {
                const error = err as AxiosError<{ message?: string }>;
                console.error(error.response?.data?.message || "Ошибка при получении данных пользователя");
                navigate("/login"); 
            }
        };

        

        fetchUser();
    }, [navigate]);

    if (!user) return (
        <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
        </div>
    );

    function handleLogOut() {
        localStorage.removeItem("token")
        window.location.reload()
        navigate("/")
    }

    const handleCloseMenu = () => {
        setDropDownProfile(false);
    };

    return (
        <div className="dropDownMenu flex column">
            <div className="profileBox flex column g8">
                <div className="user flex between g8">
                    <div className="userHeader flex g8">
                        <div className="userAvatar flex g8">
                            <img
                                src={user?.avatarImage ? `http://localhost:5000${user.avatarImage}` : defaultAvatar}
                                alt={user.username || "Пользователь"}
                            />
                            {user.online && <span className="online-dot" />}
                        </div>
                        <div className="textBox flex column">
                            <p className="fullname">{user.firstname} {user.lastname}</p>
                            <p className="username">@{user.username}</p>
                        </div>
                    </div>
                    <button className="closeButton flex center" onClick={onClose}>
                        <CrossIcon />
                    </button>
                </div>
                {user.description ? (
                    <p className="description">{user.description}</p>
                ) : (
                    <button className="setDescriptionButton">Set Description</button>
                )}
            </div>

            <nav className="chatsHeaderNavigate flex column">
            <button className="dropDownMenuButton profile" onClick={() => {setDropDownProfile((prev) => !prev);}}><ProfileIcon/> Мой профиль</button>
            <button className="dropDownMenuButton logOut" onClick={handleLogOut}><LogOutIcon /> Выйти из аккаунта</button>
            <SwitchTheme />
            </nav>

            {dropDownProfile && <UserProfileAlert receiverId={user.id} onClose={handleCloseMenu} />}
        </div>
    );
};
