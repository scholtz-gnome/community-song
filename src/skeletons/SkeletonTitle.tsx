import "./Skeleton.css";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonTitle = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-title">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonTitle;
