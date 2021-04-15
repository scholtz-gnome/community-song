import SkeletonElement from "./SkeletonElement";
import "./Skeleton.css";

const SkeletonSong = () => {
  return (
    <div className="skeleton-song">
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
    </div>
  );
};

export default SkeletonSong;
