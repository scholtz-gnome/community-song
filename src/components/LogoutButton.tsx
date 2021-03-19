import { useAuth0 } from "@auth0/auth0-react";
import "./LogoutButton.css";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <p onClick={() => logout()}>Log Out</p>;
  } else {
    return <div></div>;
  }
};

export default LogoutButton;
