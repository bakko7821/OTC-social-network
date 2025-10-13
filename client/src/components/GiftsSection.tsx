import { useEffect, useState } from "react"
import "../styles/Sections.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import { GiftsSecitonSkeleton } from "./skeletons/GiftsSectionSkeleton";

interface GiftItem {
    id: number;
    giftImage: string;
    friendId: number;
    friendFirstname: string;
    friendLastname: string;
    friendAvatar: string;
}

export const GiftsSeciton = () => {
    const { id } = useParams<{ id: string }>();
    const currentUserId = localStorage.getItem("userId");
    const userId = id === undefined ? currentUserId : id;

    const [gifts, setGifts] = useState<GiftItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios
            .get<GiftItem[]>(`http://localhost:5000/api/users/${userId}/gifts`)
            .then((res) => {
                setGifts(res.data);
                setLoading(true)
            })
            .catch((err) => {
                console.error("Ошибка при получении пользователя:", err);
            });
    }, [userId])

    if (!loading) return <GiftsSecitonSkeleton />

    return (
        <div className="giftsSection flex column g8">
            <div className="headingText flex g8">
                <p className="titleText">Подарки</p>
                <span className="circle"></span>
                <p className="countText">{gifts.length}</p>
            </div>
            {gifts && gifts.length > 0 ? (
                <div className="allGiftsBox flex g8">
                    {gifts && gifts.slice(-5).map((gift) => (
                        <div className="giftItem" key={gift.id}>
                            <img src={`http://localhost:5000${gift.giftImage}`} alt="Подарок" />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="nullMessage">У пользователя нет подарков</p>
            )}
        </div>
    )
}