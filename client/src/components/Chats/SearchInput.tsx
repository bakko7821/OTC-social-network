import { useEffect, useState } from "react";
import '../../styles/main_page.scss'
import type { User } from "../../types"
import axios from "axios";
import defaultAvatar from "../../assets/images/58e8ff52eb97430e819064cf.png"

interface SearchInputProps {
  onSelectUser: (user: User) => void;
}

export const SearchInput = ({ onSelectUser }: SearchInputProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<User[]>([]);
    const [isActive, setIsActive ] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    const handleClick = (user: User) => {
        onSelectUser(user);
    };


    async function handleSearch() {
        const cleaned = query.startsWith("@") ? query.slice(1) : query;
        if (!cleaned) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(
            `http://localhost:5000/api/users/search?username=${cleaned}`
            );
            setResults(res.data);
            setIsActive(true)
        } catch (err) {
            console.error("Ошибка при поиске:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`searchBox ${isActive ? "active" : ""}`}>
            <input
                type="search"
                className="searchInput"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {query && results.length > 0 && (
                <div className="searchResultBox flex column">
                    {results.map((user) => (
                    <div key={user.id} className="searchResultCard flex g8" onClick={() => handleClick(user)}>
                        <div className="userAvatar flex g8">
                            <img
                                src={user?.avatarImage ? `http://localhost:5000${user.avatarImage}` : defaultAvatar}
                                alt={user.username || "Пользователь"}
                            />
                            {user.online && <span className="online-dot" />}
                        </div>
                        <div className="textbox flex column">
                            <span className="fullname">{user.firstname} {user.lastname}</span>
                            <span className="username">@{user.username}</span>
                        </div>
                    </div>
                    ))}
                </div>
            )}

            {query && !loading && results.length === 0 && (
                <div className="nullMessage">
                    Не можем найти пользователей с таким username
                </div>
            )}
        </div>
    );
}