import SkeletonElement from "./SkeletonElement";
import "./Skeleton.css";

const SkeletonProfileSong = () => {
  return (
    <div className="skeleton-profile-song">
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
    </div>
  );
};

export default SkeletonProfileSong;
