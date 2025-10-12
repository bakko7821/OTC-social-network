import { useNavigate, useLocation } from "react-router-dom";
import {
  FeedIcon,
  FriendIcon,
  GroupsIcon,
  MessagesIcon,
  MovieIcon,
  MusicIcon,
  PhotoIcon,
  ProfileIcon,
} from "../Icons/Icons";
import "../styles/Navigation.css";
import { useEffect, useState } from "react";
import { useAuthValue } from "../hooks/useAuth";
import { NavigationSkeleton } from "./skeletons/NavigationSkeleton";

export const Navigation = () => {
  const { isAuth, setIsAuth } = useAuthValue();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      const token = localStorage.getItem("token");
      
      if (token) {
        setIsAuth(true);
      }

      return setLoading(true)
    }, []);

  const navItems = [
    { path: "/profile/me", label: "Профиль", Icon: ProfileIcon },
    { path: "/feed", label: "Лента", Icon: FeedIcon },
    { path: "/me/messages", label: "Сообщения", Icon: MessagesIcon },
    { path: "/me/friends", label: "Друзья", Icon: FriendIcon },
    { path: "/me/groups", label: "Группы", Icon: GroupsIcon },
    { path: "/me/photos", label: "Фотографии", Icon: PhotoIcon },
    { path: "/me/music", label: "Музыка", Icon: MusicIcon },
    { path: "/me/videos", label: "Видео", Icon: MovieIcon },
  ];

  if (!loading) return <NavigationSkeleton />;

  return (
    <div className="">
      {isAuth ? (
        <nav className="navigationMenu flex column g8">
          {navItems.map(({ path, label, Icon }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`goTo ${label.toLowerCase()} ${isActive ? "active" : ""}`}
              >
                <Icon />
                {label}
              </button>
            );
          })}
        </nav>
      ) : (
        <div className="navigationMenuFalse"></div>
      )}
    </div>
  );
};
