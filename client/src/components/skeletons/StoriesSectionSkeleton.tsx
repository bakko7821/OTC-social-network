import "../../styles/Skeletons.css"

export const StoriesSectionSkeleton = () => {
  return (
    <div className="storiesSection-skeleton flex g8">
      <div className="storyItem create flex column">
        <p className="button-skeleton"></p>
      </div>
      <div className="storyItem create flex column">
        <p className="button-skeleton"></p>
      </div>
      <div className="storyItem create flex column">
        <p className="button-skeleton"></p>
      </div>
      <div className="storyItem create flex column">
        <p className="button-skeleton"></p>
      </div>
      <div className="storyItem create flex column">
        <p className="button-skeleton"></p>
      </div>
      <div className="storyItem create flex column">
        <p className="button-skeleton"></p>
      </div>
    </div>
  );
};
