import { CommentIcon, LikeIcon, MoreIcon, SendIcon } from "../Icons/Icons"
import "../styles/Feed.css"

export const PostsSection = () => {
    return (
        <div className="postsSection flex column g8">
            <div className="postItem flex column">
                <div className="postHeader flex between">
                    <div className="userCard flex center g8">
                        <div className="userAvatar"></div>
                        <p className="userFullName">Дмитрий Эшман</p>
                    </div>
                    <button className="moreButton"><MoreIcon /></button>
                </div>
                <div className="postContent">

                </div>
                <div className="postInfoBox flex g16">
                    <div className="likeBox flex center g8">
                        <LikeIcon />
                        <p>123</p>
                    </div>
                    <div className="likeBox flex center g8">
                        <CommentIcon />
                        <p>123</p>
                    </div>
                    <div className="likeBox flex center g8">
                        <SendIcon />
                        <p>123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}