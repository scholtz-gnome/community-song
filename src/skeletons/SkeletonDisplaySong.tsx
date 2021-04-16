import "./Skeleton.css";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonDisplaySong = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-display-song">
        <div className="side-panel">
          <div className="info">
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="avatar" />
            <SkeletonElement type="text" />
            <Shimmer />
          </div>
          <div className="loading">
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
          </div>
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDisplaySong;
