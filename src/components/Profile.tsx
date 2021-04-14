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
          <h3>View your profile details here</h3>
        </header>
        <div className="outline">
          <img src={user.profile_pic} alt={user.email} />
          <p>Name:{user.first_name}</p>
          <p>Surname: {user.last_name}</p>
          <p>{user.email}</p>
        </div>
      </div>
    );
  } else {
    return <div>You're not logged in</div>;
  }
};

export default Profile;
