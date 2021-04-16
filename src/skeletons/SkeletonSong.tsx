import "./Skeleton.css";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonSong = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-song">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonSong;
