import { useEffect, useState } from "react";
import { BackIcon, CrossIcon, EditIcon, Info2Icon, MoreIcon } from "../../../assets/Icons"
import { type User, type DropDownMenuProps, type Props } from "../../../types"
import axios from "axios";
import defaultAvatar from "../../../assets/images/58e8ff52eb97430e819064cf.png"
import { EditProfileAlert } from "../../EditProfileAlert";

type UserProfileAlertProps = Props & DropDownMenuProps;

export const UserProfileAlert = ({ receiverId, onClose }: UserProfileAlertProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuth, setIsAuth ] = useState(false)
    const [isEditing, setIsEditing ] = useState(false)

    useEffect(() => {
        const localUserId = Number(localStorage.getItem("userId"))
        if (!localUserId) return

        try {
            if (localUserId === receiverId) setIsAuth(true)
        } catch (error: unknown) {
            console.log("Не удалось получить ID авторизованного пользователя" + error)
        }

    }, [receiverId])

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
                    <button className={isEditing ? "backButton flex center" : "backButton none flex center"} onClick={() => {setIsEditing((prev) => !prev)}}><BackIcon /></button>
                    <span>{isEditing ? "Edit Profile" : "User Info"}</span>
                    <nav className="userProfileHeaderNavigate">
                        <button className="moreButton"><MoreIcon /></button>
                        <button className="closeButton" onClick={onClose}><CrossIcon /></button>
                    </nav>
                </div>
                {isEditing ? (
                    <EditProfileAlert user={user} setUser={setUser}/>
                ) : (
                    <div className="userInfoBox flex column g8 ">
                        <div className="userInfoHeader flex g16">
                            <div className="userAvatar flex center">
                                <img
                                    src={user?.avatarImage ? `http://localhost:5000${user.avatarImage}` : defaultAvatar}
                                    alt={user?.username || "@default"}
                                />
                            </div>
                            <div className="textBox flex column">
                                <span className="fullname">{user?.firstname} {user?.lastname}</span>
                                <span className={user?.online ? "onlineStatus active" : "onlineStatus"}>
                                    {user?.online ? "В сети" : "Не в сети"}
                                </span>
                            </div>
                        </div>
                        {isAuth && <button className="editProfileButton flex center g8" onClick={() => {
                            setIsEditing((prev) => !prev);
                        }}><EditIcon /> Редактировать профиль</button>}
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
                )}
            </div>
        </div>
    )
}