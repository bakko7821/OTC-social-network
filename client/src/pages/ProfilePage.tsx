import { useParams } from "react-router-dom";
import { UserProfileCard } from "../components/UserProfileCard";
import "../styles/Profile.css"
import type { JSX } from "react";

export default function ProfilePage() : JSX.Element {
    const { id } = useParams<{ id: string }>();
    console.log(id)
    const isMe = id === "me";
    return (
        <>
            {isMe ? (
                <p>Мой профиль</p>
            ) : (
                <div className="profilePage flex colum g16">
                    <UserProfileCard />
                </div>
            )}
        </>
    )
}