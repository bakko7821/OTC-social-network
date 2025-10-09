import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowDownIcon, ChangeThemeIcon, InfoIcon, LocationIcon, MonkeyIcon, SetImageIcon } from "../Icons/Icons";
import { UserProfileCardSkeleton } from "./skeletons/UserProfileCardSkeleton";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  description: string;
  location: string;
  email: string;
  headImage: string;
  avatarImage: string;
  createdAt: string;
}

export const UserProfileCard = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const [isMe, setIsMe] = useState(false);
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // определяем URL
                const url =
                id === "me" || !id
                    ? "http://localhost:5000/api/users/me"
                    : `http://localhost:5000/api/users/${id}`;

                // добавляем заголовок только если нужно
                const config =
                id === "me" || !id
                    ? { headers: { Authorization: `Bearer ${token}` } }
                    : undefined;

                const res = await axios.get<User>(url, config);
                setUser(res.data);

                // если профиль «мой»
                if (id === "me" || (!id && token)) setIsMe(true);
                else if (token && res.data) {
                // можно дополнительно сверить id из токена
                const payload = JSON.parse(atob(token.split(".")[1]));
                setIsMe(payload.id === res.data.id);
                } else setIsMe(false);
            } catch (err) {
                console.error("Ошибка при получении пользователя:", err);
            }
            };

        fetchUser();
    }, [id, token]);

    if (!user) return <UserProfileCardSkeleton />;

    return (
        <div className="userProfileCard flex column">
            <div className="headImageBox flex center">
                {isMe ? (
                    <div className="editImagebox">
                        <a onClick={() => navigate("/me/edit-profile")} className="setImage link flex center g8">
                            <ChangeThemeIcon />
                            Изменить изображение
                        </a>
                        <img src={user?.headImage || "../../public/images/stockBackground.jpg"} alt="" className="headImage" />
                    </div>
                ) : (
                    <img src={user?.headImage || "../../public/images/stockBackground.jpg"} alt="" className="headImage" />
                )}
            </div>
            <div className="userInfo flex between">
                <div className="userInfoCard flex g8">
                    <div className="userAvatar flex center">
                        {isMe ? (
                            <>
                                <div className="editAvatarBox">
                                    <a onClick={() => navigate("/me/edit-profile")}><SetImageIcon /></a>
                                </div>
                                {user?.avatarImage ? (
                                    <img src={user.avatarImage} alt="Аватар" />
                                ) : (
                                    <MonkeyIcon />
                                )}
                            </>
                        ) : (
                            <>
                                {user?.avatarImage ? (
                                    <img src={user.avatarImage} alt="Аватар" />
                                ) : (
                                    <MonkeyIcon />
                                )}
                            </>
                        )}
                    </div>
                    <div className="textBox flex column g16">
                        <div className="usernameBox flex g8">
                            <p className="fullNameUser">{user?.firstname} {user?.lastname}</p>
                            <span className="cirle"></span>
                            <p className="userName">@{user?.username}</p>
                        </div>
                        {user?.description ? (
                            <p className="userDescription">{user.description}</p>
                        ) : (isMe ? (
                            <a onClick={() => navigate("/me/edit-profile")} className="userDescription link">
                                Укажите описание
                            </a>
                        ) : (
                            <p className="userDescription">У пользователя ничего не указанно</p>
                        ))}
                        <div className="infoBox flex g16">
                            {user?.location ? (
                                <div className="locationBox card">
                                    <LocationIcon />
                                    <p>{user.location}</p>
                                </div>
                            ) : (isMe ? (
                                <a onClick={() => navigate("/me/edit-profile")} className="locationBox card link">
                                    {/* <LocationIcon /> */}
                                    Укажите местоположение
                                </a>
                            ): (
                                <></>
                            ))}
                            <button className="moreUserInfo card">
                                <InfoIcon />
                                Подробнее
                            </button>
                        </div>
                    </div>
                </div>
                <div className="buttonsBox flex center g8">
                    {isMe ? (
                        <button onClick={() => navigate("/me/edit-profile")} className="editProfile button">
                            Изменить профиль
                        </button>
                    ) : (
                        <button onClick={() => console.log("Заявка отправленна")} className="addFriend button">
                            Добавить в друзья
                        </button>
                    )}
                    <button className="moreButton">
                        Ещё
                        <ArrowDownIcon />
                    </button>
                </div>
                
            </div>
        </div>
    )
}