import { useEffect, useState } from "react";
import type { Props, User } from "../../../types";
import axios, { AxiosError } from "axios";
import { InfoIcon, MoreIcon, SearchIcon } from "../../../assets/Icons";
import { MoreDropDownMenu } from "./MoreDropDownMenu";
import { SearchInput } from "./SearchInput";
import { UserProfileAlert } from "./UserProfileAlert";

export const MessageHeader = ({ receiverId }: Props) => {
    console.log("MessageHeader receiverId:", receiverId);
    const [dropDownStatus, setDropDownStatus] = useState(false);
    const [dropDownSearch, setDropDownSearch] = useState(false);
    const [dropDownProfile, setDropDownProfile] = useState(false);
    const [ user, setUser ] = useState<User | null>(null)
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get<User>(`http://localhost:5000/api/users/${receiverId}`)

                setUser(res.data);
            } catch (err) {
                const error = err as AxiosError<{ message?: string }>;
                console.error(error.response?.data?.message || "Ошибка при получении данных пользователя");
            }
        };

        fetchUser();
    }, [receiverId])

    const handleCloseMenu = () => {
        setDropDownStatus(false);
        setDropDownSearch(false);
        setDropDownProfile(false);
    };

    return (
        <div className="messageHeader flex between">
            <div className="textBox flex column">
                <span className="fullname">{user?.firstname} {user?.lastname}</span>
                <span className={user?.online ? "onlineStatus active" : "onlineStatus"}>
                    {user?.online ? "В сети" : "Не в сети"}
                </span>
            </div>
            <nav className="flex">
                <button onClick={() => {
                        setDropDownSearch((prev) => !prev);
                        }}>
                    <SearchIcon /></button>
                <button onClick={() => {
                        setDropDownProfile((prev) => !prev);
                        }}>
                    <InfoIcon /></button>
                <button onClick={() => {
                        setDropDownStatus((prev) => !prev);
                        }}>
                    <MoreIcon />
                </button>
            </nav>

            {dropDownSearch && <SearchInput onClose={handleCloseMenu}/>}
            {dropDownProfile && <UserProfileAlert receiverId={receiverId} />}
            {dropDownStatus && <MoreDropDownMenu receiverId={receiverId} />}
        </div>
    )
}