import "./ProfilePic.css";
import ProfilePicProps from "../interfaces/ProfilePicProps";

const ProfilePic: React.FC<ProfilePicProps> = ({ user, color, size }) => {
  return (
    <div>
      {user?.profilePic && (
        <div>
          <img
            src={user.profilePic}
            alt={user.email}
            className={`${size}Image`}
          />
        </div>
      )}
      {!user?.profilePic && (
        <div className={`${color} ${size} ProfilePic`}>
          {user?.email[0].toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
