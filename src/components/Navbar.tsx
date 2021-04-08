import "./Navbar.css";
import { Link } from "react-router-dom";
import User from "../interfaces/UserInterface";
import config from "../config";

interface UserProps {
  user: User | undefined;
}

const Navbar: React.FC<UserProps> = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>Community Song</h1>
        </Link>
      </div>
      <div className="links">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
        <div>
          <Link to="/create">Create</Link>
        </div>
      </div>
      <div className="auth">
        {user?.id && (
          <div className="logged-in">
            <div className="link">
              <a href={`${config.API_ROOT}/auth/logout`}>Log Out</a>
            </div>
            <div>
              <img src={user.profile_pic} alt={user.email} />
            </div>
          </div>
        )}
        {!user?.id && <a href={`${config.API_ROOT}/auth/google`}>Log In</a>}
      </div>
    </nav>
  );
};

export default Navbar;
