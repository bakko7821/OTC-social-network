import "../../styles/Skeletons.css"

export const ProfilePostSectionSkeleton = () => {
    return (
        <div className="profilePost-skeleton flex column g16">
            <div className="postItem flex column g16">
                <div className="postHeader flex center g8">
                    <div className="userAvatar"></div>
                    <div className="skeleton-text"></div>
                </div>
                <div className="post-title-skeleton flex column g8">
                    <div className="post-title-content-skeleton"></div>
                    <div className="post-title-content-skeleton"></div>
                    <div className="post-title-content-skeleton"></div>
                </div>
                <div className="post-info-skeleton"></div>
            </div>
            <div className="postItem flex column g16">
                <div className="postHeader flex center g8">
                    <div className="userAvatar"></div>
                    <div className="skeleton-text"></div>
                </div>
                <div className="post-title-skeleton flex column g8">
                    <div className="post-title-content-skeleton"></div>
                    <div className="post-title-content-skeleton"></div>
                    <div className="post-title-content-skeleton"></div>
                </div>
                <div className="post-info-skeleton"></div>
            </div>
            <div className="postItem flex column g16">
                <div className="postHeader flex center g8">
                    <div className="userAvatar"></div>
                    <div className="skeleton-text"></div>
                </div>
                <div className="post-title-skeleton flex column g8">
                    <div className="post-title-content-skeleton"></div>
                    <div className="post-title-content-skeleton"></div>
                    <div className="post-title-content-skeleton"></div>
                </div>
                <div className="post-info-skeleton"></div>
            </div>
        </div>
    )
}