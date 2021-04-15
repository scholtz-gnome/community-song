import "./Skeleton.css";

interface SkeletonTypeProps {
  type: string;
}

const SkeletonElement: React.FC<SkeletonTypeProps> = ({ type }) => {
  const classes = `skeleton ${type}`;

  return <p className={classes}></p>;
};

export default SkeletonElement;
