import { useNavigate, useParams } from "react-router-dom"
import "../styles/Sections.css"
import { useEffect, useState } from "react"

interface FriendItem {
  id: number;
}

export const FriendsSection = () => {
    const { id } = useParams<{ id: string }>();
    const currentUserId = localStorage.getItem("userId");
    const userId = id === undefined ? currentUserId : id;

    const navigate = useNavigate()
    const [friends, setFriends] = useState<FriendItem[]>([])

    useEffect(() => {
    const fetchFriends = async () => {
        try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}/friends`);
        if (!response.ok) throw new Error("Ошибка при получении друзей");
        const data: FriendItem[] = await response.json();
        setFriends(data);
        } catch (err) {
        console.error(err);
        }
    };

    fetchFriends();
    }, [userId]); 


    return (
        <div className="friendsSection flex column">
            <div className="headingText flex g8" onClick={() => navigate("/me/friends")}>
                <p className="titleTex">Друзья онлайн</p>
                <span className="circle"></span>
                <p className="countText">13</p>
            </div>
            <div className="onlineFriendBox">

            </div>
            <span className="line"></span>
            <div className="headingText flex g8" onClick={() => navigate("/me/friends")}>
                <p className="titleTex">Друзья</p>
                <span className="circle"></span>
                <p className="countText">182</p>
            </div>
            <div className="allFriendsBox">
                {friends && friends.map((friend) => (
                    <div className="friendItem" key={friend.id}>
                        <p>{friend.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}