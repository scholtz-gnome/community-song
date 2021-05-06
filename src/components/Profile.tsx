import config from "../config";
import "./info.css";
import "./side-panel.css";
import ProfileSongList from "./ProfileSongList";
import ProfilePic from "./ProfilePic";
import UserProps from "../interfaces/UserProps";

const Profile: React.FC<UserProps> = ({ user }) => {
  if (user?.id) {
    return (
      <div>
        <div className="side-panel">
          <div className="info">
            <ProfilePic user={user} color="dark" size="big" />
            <p>{user.firstName}</p>
            <p>{user.email}</p>
          </div>
          <div>
            <ProfileSongList user={user} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h3>
        <a className="link-reset" href={`${config.API_ROOT}/auth/google`}>
          You're not logged in
        </a>
      </h3>
    );
  }
};

export default Profile;
