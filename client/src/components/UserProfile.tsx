import { BackIcon, CrossIcon, Info2Icon, MoreIcon } from "../assets/Icons";
import defaultAvatar from "../assets/images/58e8ff52eb97430e819064cf.png"
import type { User } from "../types";
import { formatPhone } from "../utils/formatPhone";

interface UserProfileProps {
    user: User | null;
    onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({user, onClose}) =>{
    return (
        <div className="userProfile">
            <div className="userProfileHeader flex between">
                <button className="backButton flex center" onClick={onClose}><BackIcon /></button>
                <span>User Info</span>
                <nav className="userProfileHeaderNavigate">
                    <button className="moreButton"><MoreIcon /></button>
                    <button className="closeButton" onClick={onClose}><CrossIcon /></button>
                </nav>
            </div>
            <div className="userInfoBox flex column">
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
                <span className="plug"></span>
                <div className="moreInfo flex g16">
                    <Info2Icon />
                    <div className="moreInfoContent flex column g4">
                        {user?.description ? (
                            <div className="moreInfoCard bio flex column">
                                <span className="phone">{user.description}</span>
                                <span className="phone body">Bio</span>
                            </div>
                        ) : (
                            <div className="moreInfoCard bio flex column">
                                <span className="phone">У пользователя отсутствует описание.</span>
                                <span className="phone body">Bio</span>
                            </div>
                        )}
                        {user?.phoneNumber ? (
                            <div className="moreInfoCard phone flex column">
                                <span className="phone">{formatPhone(user.phoneNumber)}</span>
                                <span className="phone body">Mobile</span>
                            </div>
                        ) : null}
                        <div className="moreInfoCard username flex column">
                            <span className="username" onClick={() => navigator.clipboard.writeText(`@${user?.username}`)}>@{user?.username}</span>
                            <span className="username body">Username</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}