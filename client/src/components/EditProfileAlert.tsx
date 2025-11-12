import type { User } from "../types"
import defaultAvatar from "../assets/images/58e8ff52eb97430e819064cf.png"
import { AtIcon, PhoneIcon, ProfileIcon, UploadIcon } from "../assets/Icons";

interface EditProfileAlertProps {
  user: User | null;
}

export const EditProfileAlert = ({user}: EditProfileAlertProps) => {
    if (!user) return <div>No user found</div>;

    return (
        <div className="editProfileAlert flex column g8">
            <div className="editProfileHeader flex column g8">
                <div className="userAvatar flex center">
                    <img src={user.avatarImage || defaultAvatar} alt={user.username || '@default'} />
                    <button className="uploadImageButton"><UploadIcon /></button>
                </div>
                <div className="textBox flex column center">
                    <span className="fullname">{user.firstname || "Firstname"} {user.lastname || "Lastname"}</span>
                     <span className={user.online ? "onlineStatus active" : "onlineStatus"}>
                        {user.online ? "В сети" : "Не в сети"}
                    </span>
                </div>
            </div>
            <input type="text" value={user.description} placeholder="Описание."/>
            <span className="descriptionBody">
                Любые подробности, такие как возраст, род занятий или город. <br/>
                Пример: 24 года. Программист из Минска.
            </span>
            <div className="editProfileMoreInfo flex column">
                <div className="editProfileMoreCard flex between fullname">
                    <div className="bodyBox flex center g8">
                        <ProfileIcon />
                        <span className="bodyText">Полное имя</span>
                    </div>
                    <input type="text" value={`${user.firstname || ""} ${user.lastname || ""}`} placeholder="Иван Иванов" />
                </div>
                <div className="editProfileMoreCard flex between phone">
                    <div className="bodyBox flex center g8">
                        <PhoneIcon />
                        <span className="bodyText">Номер телефона</span>
                    </div>
                    <input type="text" value={"+0 000 000 00 00"} placeholder="+0 000 000 00 00"/>
                </div>
                <div className="editProfileMoreCard flex between username">
                    <div className="bodyBox flex center g8">
                        <AtIcon />
                        <span className="bodyText">Имя пользователя</span>
                    </div>
                    <input type="text" value={user.username} placeholder="@ivanov"/>
                </div>
                {/* <div className="editProfileMoreCard flex between birthday">
                    <div className="bodyBox flex center g8">
                        <AtIcon />
                        <span className="bodyText">Дата рождения</span>
                    </div>
                    <input type="date" value={""} placeholder="16.02.2007"/>
                </div> */}
            </div>
        </div>
    )
}