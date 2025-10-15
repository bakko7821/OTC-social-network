import { useEffect, useState } from "react";
import "../styles/Feed.css";
import { useParams } from "react-router-dom";
import { MonkeyIcon } from "../Icons/Icons";
import { StoriesSectionSkeleton } from "./skeletons/StoriesSectionSkeleton";

interface OwnerInfo {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string;
  online: boolean;
}

interface StorieItem {
  id: number;
  userId: number;
  image: string;
  text: string;
  createdAt: string;
  owner?: OwnerInfo;
}

interface FriendItem {
  friendId: number;
  friendFirstname: string;
  friendLastname: string;
  friendAvatar: string;
  friendOnline: boolean;
}

export const StoriesSection = () => {
  const { id } = useParams<{ id: string }>();
  const currentUserId = localStorage.getItem("userId");
  const userId = id ?? currentUserId;

  const [stories, setStories] = useState<StorieItem[]>([]);
  const [friends, setFriends] = useState<FriendItem[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}/friends`);

        if (!response.ok) throw new Error("Ошибка при получении друзей");
        const data: FriendItem[] = await response.json();

        setFriends(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) fetchFriends();
  }, [userId]);

  useEffect(() => {
    const fetchStories = async () => {
        try {
        const results = await Promise.all(
            friends.map(async (friend) => {
            const res = await fetch(`http://localhost:5000/api/stories/${friend.friendId}`);
            if (!res.ok) throw new Error("Ошибка при получении историй");
            const data: StorieItem[] = await res.json();

            return data.map((story) => ({
                ...story,
                owner: {
                id: friend.friendId,
                firstname: friend.friendFirstname,
                lastname: friend.friendLastname,
                avatar: friend.friendAvatar,
                online: friend.friendOnline,
                },
            }));
            })
        );

        const mergedStories = results.flat();

        setStories(mergedStories);
        setLoading(true)
        } catch (error) {
        console.log(error);
        }
    };

    if (friends.length > 0) fetchStories();
    }, [friends]);

  if (!loading) return <StoriesSectionSkeleton />

  return (
    <div className="storiesSection flex g8">
      <div className="storyItem create flex column">
        <button className="flex center">Добавить историю</button>
      </div>

        {stories.length > 0 ? (
            stories.map((story) => (
                <div key={story.id} className="storyItem flex column between">
                    <img src={story.image} alt="" className="storyImage" />
                    {story.text && <p>{story.text}</p>}
                    <div className="storyHeader flex center g8">
                        <div className="userCard flex center g8">
                            <div className="userAvatar flex center">
                                {story.owner?.avatar ? (
                                    <img src={story.owner?.avatar} alt="" />
                                ) : (
                                    <MonkeyIcon />
                                )}
                            </div>
                            <p className="fullNameUser">
                                {story.owner?.firstname}
                            </p>
                        </div>
                    </div>
                </div>
            ))
        ) : (
        <p>Историй пока нет</p>
        )}
    </div>
  );
};
