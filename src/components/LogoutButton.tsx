import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <button onClick={() => logout()}>Log Out</button>;
  } else {
    return <div></div>;
  }
};

export default LogoutButton;
