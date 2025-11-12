import { CrossIcon, MoreIcon } from "../../../assets/Icons"
import type { Props } from "../../../types"

export const UserProfileAlert = ({ receiverId }: Props) => {
    return (
        <div className="userProfileAlert flex center">
            <div className="userProfile flex column g16" key={receiverId}>
                <div className="userProfileHeader flex between">
                    <span>User Info</span>
                    <nav>
                        <button className="moreButton"><MoreIcon /></button>
                        <button className="closeButton"><CrossIcon /></button>
                    </nav>
                </div>
            </div>
        </div>
    )
}