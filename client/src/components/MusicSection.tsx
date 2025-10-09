import { useEffect, useState } from "react";
import "../styles/NavigateSection.css"
import { useParams } from "react-router-dom";

export const MusicSection = () => {
    const { id } = useParams<{ id: string }>();
    const currentUserId = localStorage.getItem("userId");
    const userId = id === undefined ? currentUserId : id;

    const [playlists, setPlaylists] = useState([]);
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const [playlistsRes, musicRes] = await Promise.all([
            fetch(`http://localhost:5000/api/users/${userId}/playlists`),
            fetch(`http://localhost:5000/api/users/${userId}/music`)
        ]);

        const playlistsData = await playlistsRes.json();
        const musicData = await musicRes.json();

        setPlaylists(playlistsData);
        setMusic(musicData);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        } finally {
        setLoading(false);
        }
    };

    fetchData();
    }, [userId]);

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="section music flex column g16">
            <div className="playlistsBox">

            </div>
            <span className="line"></span>
            <div className="musicBox">

            </div>
            <button className="seeAllMusic">Показать всё</button>
        </div>
    )
}