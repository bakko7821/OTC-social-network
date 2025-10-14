import { useParams } from "react-router-dom";
import { UserProfileCard } from "../components/UserProfileCard";
import "../styles/Profile.css";
import { NavigateSection } from "../components/NavigateSection";
import { FriendsSection } from "../components/FriendsSection";
import { GiftsSeciton } from "../components/GiftsSection";
import { GroupSection } from "../components/GroupsSection";

export default function ProfilePage() {
    const { id } = useParams<{ id: string }>();
    const token = localStorage.getItem("token");

    if (id === "me") {
        if (!token) {
            return <div>Вы не авторизованы</div>;
        }
    }

    return (
        <div className="profilePage flex column g16">
            <UserProfileCard />
            <div className="bottomBox flex g16">
                <div className="leftBox flex column g16">
                    <NavigateSection />
                </div>
                <div className="rightBox flex column g16">
                    <FriendsSection />
                    <GiftsSeciton />
                    <GroupSection />
                </div>
            </div>
        </div>
    );
}
