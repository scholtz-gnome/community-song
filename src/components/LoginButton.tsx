import "./LoginButton.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return (
      !isAuthenticated && <p onClick={() => loginWithRedirect()}>Log In</p>
    );
  } else {
    return <div></div>;
  }
};

export default LoginButton;
