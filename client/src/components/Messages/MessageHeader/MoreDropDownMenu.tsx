import { deleteChat } from "../../../api/messages"
import type { Props } from "../../../types"

export const MoreDropDownMenu = ({ receiverId }: Props) => {
    return (
        <div className="more dropDownMenu">
            <button onClick={() => deleteChat(receiverId)}>Delete Chat</button>
        </div>
    )
}