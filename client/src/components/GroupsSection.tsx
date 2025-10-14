import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { GroupIcon } from "../Icons/Icons";
import "../styles/Sections.css"
import { GroupSectionSkeleton } from "./skeletons/GroupsSectionSkeleton";

interface GroupItem {
  id: number;
  groupName: string;
  groupUsername: string;
  groupAvatar: string;
  groupSubs: number;
}

export const GroupSection = () => {
    const { id } = useParams<{ id: string }>();
    const currentUserId = localStorage.getItem("userId");
    const userId = id === undefined ? currentUserId : id;

    const navigate = useNavigate()
    const [groups, setGroups] = useState<GroupItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
    const fetchFriends = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}/groups`)
            
            if (!response.ok) throw new Error("Ошибка при получении друзей");
            
            const data: GroupItem[] = await response.json();

            setGroups(data);
            setLoading(true)
        } catch (err) {
            console.error(err);
        }
    };

    fetchFriends();
    }, [userId]); 

    if (!loading) return <GroupSectionSkeleton />

    return (
        <div className="groupSection flex column g8">
            <div className="headingText flex g8">
                <p className="titleText">Группы</p>
                <span className="circle"></span>
                <p className="countText">{groups.length}</p>
            </div>
            {groups && groups.length > 0 ? (
                <div className="allGroupsBox flex column g8">
                    {groups.slice(-5).map((group) => (
                    <div
                        className="groupItem flex g8"
                        key={group.id}
                        onClick={() => navigate(`/groups/${group.id}`)}
                    >
                        <div className="groupAvatar flex center">
                        {group?.groupAvatar ? (
                            <img src={group.groupAvatar} alt="" />
                        ) : (
                            <GroupIcon />
                        )}
                        </div>
                        <div className="textBox flex column">
                            <p className="groupName">{group.groupName}</p>
                            <p className="groupUsername">@{group.groupUsername}</p>
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                <p className="nullMessage">У пользователя нет друзей</p>
            )}
        </div>
    )
}