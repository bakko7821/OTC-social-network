import "../../styles/Skeletons.css"

export const MusicSectionSkeleton = () => {
    return (
        <div className="section music flex column g16">
            <div className="playlistsBox flex g8">
                <div className="playlistCard-skeleton flex column g8">
                    <div className="playlistAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <p className="playlistName"></p>
                </div>
                <div className="playlistCard-skeleton flex column g8">
                    <div className="playlistAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <p className="playlistName"></p>
                </div>
                <div className="playlistCard-skeleton flex column g8">
                    <div className="playlistAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <p className="playlistName"></p>
                </div>
                <div className="playlistCard-skeleton flex column g8">
                    <div className="playlistAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <p className="playlistName"></p>
                </div>
                <div className="playlistCard-skeleton flex column g8">
                    <div className="playlistAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <p className="playlistName"></p>
                </div>
            </div>
    
            <span className="line-skeleton"></span>
    
            <div className="musicBox">
                <div className="musicCard-skeleton flex g8">
                    <div className="musicAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <div className="textBox flex column">
                        <p className="musicName"></p> 
                        <p className="musicAuthor"></p>
                    </div>
                </div>
                <div className="musicCard-skeleton flex g8">
                    <div className="musicAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <div className="textBox flex column">
                        <p className="musicName"></p> 
                        <p className="musicAuthor"></p>
                    </div>
                </div>
                <div className="musicCard-skeleton flex g8">
                    <div className="musicAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <div className="textBox flex column">
                        <p className="musicName"></p> 
                        <p className="musicAuthor"></p>
                    </div>
                </div>
                <div className="musicCard-skeleton flex g8">
                    <div className="musicAvatar flex center">
                        <div className="musicImage"></div>
                    </div>
                    <div className="textBox flex column">
                        <p className="musicName"></p> 
                        <p className="musicAuthor"></p>
                    </div>
                </div>
            </div>
            <button className="seeAllMusicButton-skeleton"></button>
        </div>
    )
}