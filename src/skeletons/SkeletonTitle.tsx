import SkeletonElement from "./SkeletonElement";
import "./Skeleton.css";

const SkeletonTitle = () => {
  return (
    <div className="skeleton-title">
      <header>
        <h1>
          <SkeletonElement type="title" />
        </h1>
        <h3>
          <SkeletonElement type="text" />
        </h3>
      </header>
    </div>
  );
};

export default SkeletonTitle;
