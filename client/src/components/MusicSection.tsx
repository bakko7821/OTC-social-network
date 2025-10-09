import { useEffect, useState, ChangeEvent } from "react";
import "../styles/NavigateSection.css"
import { useParams } from "react-router-dom";

interface MusicItem {
  id: number;
  title: string;
  author: string;
  file: string;
  image: string;
}

interface PlaylistItem {
  id: number;
  title: string;
  image: string;
}

export const MusicSection = () => {
  const { id } = useParams<{ id: string }>();
  const currentUserId = localStorage.getItem("userId");
  const userId = id === undefined ? currentUserId : id;

  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [music, setMusic] = useState<MusicItem[]>([]);
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
        {playlists.map(p => (
          <div key={p.id}>{p.title}</div>
        ))}
      </div>

      <span className="line"></span>

      <div className="musicBox">
        {music.map(m => (
          <div key={m.id}>
            {m.image ? (
                <img src={m.image} alt="" className="musicAvatar" />
            ) : (
                <div className="musicAvatar"></div>
            )}
            {m.title} — {m.author} 
            {m.file && <audio controls src={`http://localhost:5000${m.file}`}></audio>}
          </div>
        ))}
      </div>
      <button className="seeAllMusic">Показать всё</button>
    </div>
  )
}
