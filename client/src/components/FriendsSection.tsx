import { useNavigate, useParams } from "react-router-dom"
import "../styles/Sections.css"
import { useEffect, useState } from "react"
import { MonkeyIcon } from "../Icons/Icons";
import { FriendsSectionSkeleton } from "./skeletons/FriendsSectionSkeleton";

interface FriendItem {
  friendId: number;
  friendFirstname: string;
  friendLastname: string;
  friendAvatar: string;
  friendOnline: boolean;
}

export const FriendsSection = () => {
    const { id } = useParams<{ id: string }>();
    const currentUserId = localStorage.getItem("userId");
    const userId = id === undefined ? currentUserId : id;

    const navigate = useNavigate()
    const [friends, setFriends] = useState<FriendItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
    const fetchFriends = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/api/users/${userId}/friends`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Ошибка при получении друзей");
            const data: FriendItem[] = await response.json();
            setFriends(data);
            setLoading(true)
        } catch (err) {
            console.error(err);
        }
    };

    fetchFriends();
    }, [userId]); 

    if (!loading) return <FriendsSectionSkeleton />

    return (
        <div className="friendsSection flex column g8">
            <div className="headingText flex g8">
                <p className="titleText">Друзья</p>
                <span className="circle"></span>
                <p className="countText">{friends.length}</p>
            </div>
            <div className="allFriendsBox flex g8">
                {friends && friends.slice(-5).map((friend) => (
                <div
                    className="friendItem flex column"
                    key={friend.friendId}
                    onClick={() => navigate(`/profile/${friend.friendId}`)}
                >
                    <div className="userAvatar flex center">
                    {friend?.friendAvatar ? (
                        <img src={friend?.friendAvatar} alt="" />
                    ) : (
                        <MonkeyIcon />
                    )}
                    </div>
                    <p className="friendName">{friend.friendFirstname}</p>
                </div>
                ))}
            </div>
        </div>
    )
}