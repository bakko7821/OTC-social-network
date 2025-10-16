import { useParams } from "react-router-dom";
import { CommentIcon, LikeIcon, MonkeyIcon, MoreIcon, SendIcon } from "../Icons/Icons"
import "../styles/Feed.css"
import { useEffect, useState } from "react";

interface OwnerInfo {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string;
  online: boolean;
}

interface PostItem {
  id: number;
  ownerId: number;
  postImage: string;
  postText: string;
  createdAt: string;
  owner?: OwnerInfo;
  likes: number;
  comments: number;
  shares: number;
}

export const ProfilePostSection = () => {
    const { id } = useParams<{ id: string }>();
    const currentUserId = localStorage.getItem("userId");
    const userId = id ?? currentUserId;

    const [posts, setPosts] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/${userId}`)
                if (!response.ok) throw new Error("Ошибка при получении постов")
                const data: PostItem[] = await response.json();

                setPosts(data);
                setLoading(true)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPosts()
    }, [userId])
    
    console.log(posts)
    if (!loading) return <p>Загрузка...</p>

    return (
        <div className="postsSection flex column g8">
            {posts && posts.length > 0 ? (
                posts.map(post => (
                    <div className="postItem flex column" key={post.id}>
                        <div className="postHeader flex between">
                            <div className="userCard flex center g8">
                                <div className="userAvatar flex center">
                                    {post.owner?.avatar ? (
                                        <img src={post.owner?.avatar} alt="" />
                                    ) : (
                                        <MonkeyIcon />
                                    )}
                                </div>
                                <p className="userFullName">{post.owner?.firstname} {post.owner?.lastname}</p>
                            </div>
                            <button className="moreButton"><MoreIcon /></button>
                        </div>
                        <div className="postContent">
                            {post.postImage ? (
                                <>
                                    <img src={post.postImage} alt="Post" />
                                    <p>{post.postText}</p>
                                </>
                            ) : (
                                    <p>{post.postText}</p>
                            )}
                        </div>
                        <div className="postInfoBox flex g16">
                            <div className="likeBox flex center g8">
                                <LikeIcon />
                                <p>{post.likes}</p>
                            </div>
                            <div className="likeBox flex center g8">
                                <CommentIcon />
                                <p>{post.comments}</p>
                            </div>
                            <div className="likeBox flex center g8">
                                <SendIcon />
                                <p>{post.shares}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="nullMessage">Постов не найдено</p>
            )}
        </div>
    )
}