import { useAuth0 } from "@auth0/auth0-react";

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="outline">
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Profile;
