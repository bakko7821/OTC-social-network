import "../../styles/Skeletons.css"

export const FriendsSectionSkeleton = () => {
    return (
        <div className="friendsSection-skeleton flex column g8">
            <div className="headingText flex g8">
                <p className="titleText"></p>
                <span className="circle"></span>
                <p className="countText"></p>
            </div>
            <div className="allFriendsBox flex g8">
                <div className="friendItem-skeleton flex column"></div>
                <div className="friendItem-skeleton flex column"></div>
                <div className="friendItem-skeleton flex column"></div>
                <div className="friendItem-skeleton flex column"></div>
                <div className="friendItem-skeleton flex column"></div>
            </div>
        </div>
    )
}