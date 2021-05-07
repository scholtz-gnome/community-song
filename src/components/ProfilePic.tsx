import "./ProfilePic.css";
import ProfilePicProps from "../interfaces/ProfilePicProps";

const ProfilePic: React.FC<ProfilePicProps> = ({
  picture,
  color,
  size,
  email,
}) => {
  return (
    <div>
      {picture && (
        <div>
          <img src={picture} alt="profilePic" className={`${size}Image`} />
        </div>
      )}
      {picture === null && (
        <div className={`${color} ${size} ProfilePic`}>
          {email[0].toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
