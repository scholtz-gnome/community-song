import User from "../interfaces/UserInterface";

interface UserProps {
  user: User | undefined;
}

const Profile: React.FC<UserProps> = ({ user }) => {
  if (user?.id) {
    return (
      <div className="outline">
        <img src={user.profile_pic} alt={user.email} />
        <p>Name:{user.first_name}</p>
        <p>Surname: {user.last_name}</p>
        <p>{user.email}</p>
        <p></p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Profile;
