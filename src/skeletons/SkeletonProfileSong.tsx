import "./Skeleton.css";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonProfileSong = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-profile-song">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonProfileSong;
