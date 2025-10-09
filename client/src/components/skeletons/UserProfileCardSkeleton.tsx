import "../../styles/Skeletons.css";

export const UserProfileCardSkeleton = () => {
  return (
        <div className="skeleton-profile flex column">
            <div className="skeleton-head-image flex center">
                
            </div>
            <div className="skeleton-user-info flex between">
                <div className="skeleton-user-info-card flex g8">
                    <div className="userAvatar flex center">
                        
                    </div>
                    <div className="textBox flex column g16">
                        <div className="usernameBox flex g8">
                            <p className="fullNameUser"></p>
                            <p className="userName"></p>
                        </div>
                        <p className="description"></p>
                        <div className="skeleton-info-box flex g16">
                            <p className="skeleton-info-card"></p>
                            <p className="skeleton-info-card"></p>
                            <p className="skeleton-info-card"></p>
                        </div>
                    </div>
                </div>
                <div className="skeleton-buttons-box flex center g8">
                    <button></button>
                    <button></button>
                </div>
                
            </div>
        </div>
  );
};
