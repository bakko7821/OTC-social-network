import axios from "axios";
import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import { useAuthValue } from "../hooks/useAuth";
import { UserProfileCard } from "../components/UserProfileCard";

export default function ProfilePage() : JSX.Element {
    const { id } = useParams<{ id: string }>();
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