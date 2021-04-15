import "./Skeleton.css";
import "../components/info.css";
import "../components/side-panel.css";
import SkeletonElement from "./SkeletonElement";

const SkeletonDisplaySong = () => {
  return (
    <div className="skeleton-display-song">
      <div className="side-panel">
        <div className="info">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
        <div className="loading"></div>
      </div>
    </div>
  );
};

export default SkeletonDisplaySong;
