import "./info.css";
import "./side-panel.css";
import ProfileSongList from "./ProfileSongList";
import User from "../interfaces/UserInterface";

interface UserProps {
  user: User | undefined;
}

const Profile: React.FC<UserProps> = ({ user }) => {
  if (user?.id) {
    return (
      <div>
        <div className="side-panel">
          <div className="info">
            <img src={user.profile_pic} alt={user.email} />
            <p>{user.first_name}</p>
            <p>{user.email}</p>
          </div>
          <div>
            <ProfileSongList user={user} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>You're not logged in</div>;
  }
};

export default Profile;
