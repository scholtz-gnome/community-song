import "./Skeleton.css";

interface SkeletonTypeProps {
  type: string;
}

const SkeletonElement: React.FC<SkeletonTypeProps> = ({ type }) => {
  const classes = `skeleton ${type}`;

  return <div className={classes}></div>;
};

export default SkeletonElement;
