import "../../styles/Skeletons.css"

export const GiftsSecitonSkeleton = () => {
    return (
        <div className="giftsSection-skeleton flex column g8">
            <div className="headingText flex g8">
            </div>
            <div className="allGiftsBox flex g8">
                <div className="giftItem-skeleton"></div>
                <div className="giftItem-skeleton"></div>
                <div className="giftItem-skeleton"></div>
                <div className="giftItem-skeleton"></div>
                <div className="giftItem-skeleton"></div>
            </div>
        </div>
    )
}