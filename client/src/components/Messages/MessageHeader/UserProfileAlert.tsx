import { useEffect, useState } from "react";
import { CrossIcon, Info2Icon, MoreIcon } from "../../../assets/Icons"
import { type User, type DropDownMenuProps, type Props } from "../../../types"
import axios from "axios";
import defaultAvatar from "../../../assets/images/58e8ff52eb97430e819064cf.png"

type UserProfileAlertProps = Props & DropDownMenuProps;

export const UserProfileAlert = ({ receiverId, onClose }: UserProfileAlertProps) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (!receiverId) return

        const fetchUser = async () => {
            try {
            const res = await axios.get(`http://localhost:5000/api/users/${receiverId}`);
            setUser(res.data);
            } catch (error: unknown) {
            console.error("Не удалось получить данные о профиле по ID:", error);
            }
        };

        fetchUser();
    }, [receiverId])

    return (
        <div className="userProfileAlert flex center">
            <div className="userProfile flex column g16" key={receiverId}>
                <div className="userProfileHeader flex between">
                    <span>User Info</span>
                    <nav>
                        <button className="moreButton"><MoreIcon /></button>
                        <button className="closeButton" onClick={onClose}><CrossIcon /></button>
                    </nav>
                </div>
                <div className="userInfoBox flex column g16 ">
                    <div className="userInfoHeader flex g16">
                        <div className="userAvatar flex center">
                            <img
                                src={user?.avatarImage || defaultAvatar}
                                alt={user?.username || "Пользователь"}
                            />
                        </div>
                        <div className="textBox flex column">
                            <span className="fullname">{user?.firstname} {user?.lastname}</span>
                            <span className={user?.online ? "onlineStatus active" : "onlineStatus"}>
                                {user?.online ? "В сети" : "Не в сети"}
                            </span>
                        </div>
                    </div>
                    <div className="moreInfo flex g16">
                        <Info2Icon />
                        <div className="moreInfoContent flex column g4">
                            <div className="moreInfoCard phone flex column">
                                <span className="phone">+ 0-000-000-00-00</span>
                                <span className="phone body">Mobile</span>
                            </div>
                            <div className="moreInfoCard username flex column">
                                <span className="username" onClick={() => navigator.clipboard.writeText(`@${user?.username}`)}>@{user?.username}</span>
                                <span className="username body">Username</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}