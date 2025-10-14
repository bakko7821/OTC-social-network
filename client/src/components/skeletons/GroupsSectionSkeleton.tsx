import "../../styles/Skeletons.css"

export const GroupSectionSkeleton = () => {
    return (
        <div className="groupSection-skeleton flex column g8">
            <div className="headingText flex g8">
            </div>
            <div className="allGroupsBox flex column g8">
                <div className="groupItem-skeleton flex g8">
                    <div className="groupAvatar flex center"></div>
                    <div className="textBox flex column">
                        <p className="groupName"></p>
                        <p className="groupUsername"></p>
                    </div>
                </div>
                <div className="groupItem-skeleton flex g8">
                    <div className="groupAvatar flex center"></div>
                    <div className="textBox flex column">
                        <p className="groupName"></p>
                        <p className="groupUsername"></p>
                    </div>
                </div>
                <div className="groupItem-skeleton flex g8">
                    <div className="groupAvatar flex center"></div>
                    <div className="textBox flex column">
                        <p className="groupName"></p>
                        <p className="groupUsername"></p>
                    </div>
                </div>
                <div className="groupItem-skeleton flex g8">
                    <div className="groupAvatar flex center"></div>
                    <div className="textBox flex column">
                        <p className="groupName"></p>
                        <p className="groupUsername"></p>
                    </div>
                </div>
                <div className="groupItem-skeleton flex g8">
                    <div className="groupAvatar flex center"></div>
                    <div className="textBox flex column">
                        <p className="groupName"></p>
                        <p className="groupUsername"></p>
                    </div>
                </div>
            </div>
        </div>
    )
}