import { Chats } from "../components/Chats"
import { Messages } from "../components/Messages"
import '../styles/main_page.scss'

export const MainPage = () => {
    return (
        <div className="page">
            <Chats />
            <div className="resizer"></div>
            <Messages />
        </div>
    )
}