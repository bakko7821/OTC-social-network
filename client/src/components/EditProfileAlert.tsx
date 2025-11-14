import type { User } from "../utils/types"
import defaultAvatar from "../assets/images/58e8ff52eb97430e819064cf.png"
import { AtIcon, PhoneIcon, ProfileIcon, SaveIcon, UploadIcon } from "../assets/Icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface EditProfileAlertProps {
  user: User | null;
  setUser: (user: User) => void;
}

export const EditProfileAlert = ({user, setUser }: EditProfileAlertProps) => {
    const [fullname, setFullname] = useState("")
    const [description, setDescription] = useState("")
    const [username, setUsername] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
    const [serverAvatarFilePath, setServerAvatarFilePath] = useState("");

    const fileInputRefAvatar = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        console.log(`Полное имя: ${fullname}`)
        console.log(`Описание: ${description}`)
        console.log(`Имя пользователя: ${username}`)
        console.log(`Номер телефона: ${phoneNumber}`)

    }, [fullname, description, username, phoneNumber])

    useEffect(() => {
        setFullname(`${user?.firstname} ${user?.lastname || ""}`)
        setDescription(`${user?.description || ""}`)
        setUsername(`@${user?.username || ""}`)
        setPhoneNumber(`${user?.phoneNumber || ""}`)
        setAvatarPreview(user?.avatarImage ? `http://localhost:5000${user.avatarImage}` : defaultAvatar);
    }, [user])

    const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatarPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("avatar", file);

        try {
        const res = await axios.post("http://localhost:5000/api/upload/avatar", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

            console.log("Файл загружен:", res.data.path);
            alert("Аватар успешно загружен!");
            setServerAvatarFilePath(res.data.path)
        } catch (error) {
        console.error(error);
        alert("Ошибка при загрузке файла");
        }
    };
    

    const handleUploadAvatarClick = () => {
        fileInputRefAvatar.current?.click();
    };

    const handleSaveChanges = async () => {
        const cleanedUsername = username.startsWith("@") ? username.slice(1) : username;

        try {
            const response = await axios.put(
            "http://localhost:5000/api/users/",
            {
                fullname,
                description,
                username: cleanedUsername,
                phoneNumber,
                avatarImage: serverAvatarFilePath,
            },
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            );

            alert("Изменения сохранены!");
            setUser(response.data.user);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error.response?.data?.message || error.message);
            alert("Ошибка при сохранении изменений");
        }
    };

    if (!user) return <div>No user found</div>;

    return (
        <div className="editProfileAlert flex column">
            <div className="editProfileHeader flex column g8">
                <div className="userAvatar flex center">
                    <img src={avatarPreview} alt={username} />
                    <button className="uploadImageButton" onClick={handleUploadAvatarClick}><UploadIcon /></button>
                    <input
                        type="file"
                        ref={fileInputRefAvatar}
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="textBox flex column center">
                    <span className="fullname">{user.firstname || ""} {user.lastname || ""}</span>
                    <span className={user.online ? "onlineStatus active" : "onlineStatus"}>
                        {user.online ? "В сети" : "Не в сети"}
                    </span>
                </div>
            </div>
            <input 
                className="descriptionInput" 
                type="text" value={description} 
                placeholder="Описание"
                onChange={(e) => setDescription(e.target.value)}/>
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
                    <input 
                        type="text" 
                        value={fullname} 
                        placeholder="Иван Иванов" 
                        onChange={(e) => setFullname(e.target.value)}/>
                </div>
                <div className="editProfileMoreCard flex between phone">
                    <div className="bodyBox flex center g8">
                        <PhoneIcon />
                        <span className="bodyText">Номер телефона</span>
                    </div>
                    <input 
                        type="text" 
                        value={phoneNumber} 
                        placeholder="+0 000 000 00 00"
                        onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div className="editProfileMoreCard flex between username">
                    <div className="bodyBox flex center g8">
                        <AtIcon />
                        <span className="bodyText">Имя пользователя</span>
                    </div>
                    <input 
                        type="text" 
                        value={username} 
                        placeholder="@ivanov"
                        onChange={(e) => setUsername(e.target.value)}/>
                </div>
            </div>
            <button className="saveChangesButton flex center g4" onClick={handleSaveChanges}><SaveIcon /> Сохранить изменения</button>
        </div>
    )
}