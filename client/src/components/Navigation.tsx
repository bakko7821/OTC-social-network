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

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
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
  );
};
