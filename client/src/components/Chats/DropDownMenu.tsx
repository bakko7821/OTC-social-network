import { Link, useNavigate } from "react-router-dom";
import { SwitchTheme } from "./SwitchTheme";
import { CrossIcon, GroupIcon, LogOutIcon, PhoneIcon, ProfileIcon, SavedIcon, SettingIcon, UserIcon } from "../../assets/Icons";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import defaultAvatar from "../../assets/images/58e8ff52eb97430e819064cf.png"
import type { DropDownMenuProps, User } from "../../types";

export const DropDownMenu = ({ onClose }: DropDownMenuProps) => {
    const [user, setUser] = useState<User | null>(null);
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
                navigate("/login"); // редирект, если токен невалидный
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

    return (
        <div className="dropDownMenu flex column">
            <div className="profileBox flex between g8">
                <div className="user flex column g8">
                    <div className="userHeader flex g8">
                        <div className="userAvatar flex g8">
                            <img
                                src={user.avatarImage || defaultAvatar}
                                alt={user.username || "Пользователь"}
                            />
                            {user.online && <span className="online-dot" />}
                        </div>
                        <div className="textBox flex column">
                            <p className="fullname">{user.firstname} {user.lastname}</p>
                            <p className="username">@{user.username}</p>
                        </div>
                    </div>
                    {user.description ? (
                        <p className="description">{user.description}</p>
                    ) : (
                        <button className="setDescriptionButton">Set Description</button>
                    )}
                </div>
                <button className="closeButton" onClick={onClose}>
                    <CrossIcon />
                </button>
            </div>

            <nav className="flex column">
            <Link to={""}><ProfileIcon /> My Profile</Link>
            <Link to={""}><GroupIcon /> New Group</Link>
            <Link to={""}><UserIcon /> Contacts</Link>
            <Link to={""}><PhoneIcon /> Calls</Link>
            <Link to={""}><SavedIcon /> Saved Message</Link>
            <Link to={""}><SettingIcon /> Settings</Link>
            <Link to={""} onClick={handleLogOut}><LogOutIcon /> Log Out</Link>
            <SwitchTheme />
            </nav>
        </div>
    );
};
