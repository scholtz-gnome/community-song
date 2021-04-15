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
        <header>
          <h1>Profile</h1>
          <h3>View your profile details and added songs</h3>
        </header>
        <main className="outline">
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
        </main>
      </div>
    );
  } else {
    return <div>You're not logged in</div>;
  }
};

export default Profile;
