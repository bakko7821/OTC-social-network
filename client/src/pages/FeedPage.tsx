import type { JSX } from "react";
import { StoriesSection } from "../components/StoriesSection";
import "../styles/Feed.css"
import { PostsSection } from "../components/PostsSection";
import { LikelyFriendsSection } from "../components/LikelyFriendsSection";

export default function FeedPage() : JSX.Element {
    return (
        <div className="feedPage flex g16">
            <div className="left-box flex column g16">
                <StoriesSection />
                <PostsSection />
            </div>
            <div className="right-box flex column g16">
                <LikelyFriendsSection />
            </div>
        </div>
    )
}