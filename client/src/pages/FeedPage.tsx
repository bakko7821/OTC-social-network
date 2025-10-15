import type { JSX } from "react";
import { StoriesSection } from "../components/StoriesSection";
import "../styles/Feed.css"

export default function FeedPage() : JSX.Element {
    return (
        <div className="feedPage flex g16">
            <div className="left-box flex column g16">
                <StoriesSection />
            </div>
            <div className="right-box flex column g16">
            
            </div>
        </div>
    )
}