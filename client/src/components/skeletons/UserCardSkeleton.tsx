import "../../styles/Skeletons.css";

export const UserCardSkeleton = () => {
  return (
    <div className="skeleton flex center g8">
        <div className="skeleton-avatar"></div>
        <div className="textBox flex column">
            <p className="fullNameUser skeleton-line"></p>
            <p className="userName skeleton-line short"></p>
        </div>
    </div>
  );
};
