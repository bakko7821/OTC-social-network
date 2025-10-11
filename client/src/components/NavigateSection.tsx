import { useState } from "react"
import { MovieIcon, MusicIcon, PhotoIcon } from "../Icons/Icons"
import "../styles/Sections.css"
import { MusicSection } from "./MusicSection"
import { PhotosSection } from "./PhotosSection"
import { VideosSection } from "./VideosSection"

export const NavigateSection = () => {
    const [activeSection, setActiveSection] = useState("music")

    return (
        <div className="navigateSection flex column g16">
            <nav className="flex g8">
                <button
                    className={`sectionNavButton flex center g8 music ${activeSection === "music" ? "active" : ""}`}
                    onClick={() => setActiveSection("music")}
                >
                    <MusicIcon />
                    Музыка
                </button>
                <button
                    className={`sectionNavButton flex center g8 videos ${activeSection === "videos" ? "active" : ""}`}
                    onClick={() => setActiveSection("videos")}
                >
                    <MovieIcon />
                    Видео
                </button>
                <button
                    className={`sectionNavButton flex center g8 hotos ${activeSection === "photos" ? "active" : ""}`}
                    onClick={() => setActiveSection("photos")}
                >
                    <PhotoIcon />
                    Фотографии
                </button>
            </nav>

            {activeSection === "music" && <MusicSection />}
            {activeSection === "videos" && <VideosSection />}
            {activeSection === "photos" && <PhotosSection />}
        </div>
    )
}
