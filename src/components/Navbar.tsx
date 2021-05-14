import config from "../config";
import "./Navbar.css";
import { Link } from "react-router-dom";
import UserProps from "../interfaces/UserProps";
import ProfilePic from "./ProfilePic";

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
          <Link to="/songs">Songs</Link>
        </div>
        <div>
          <Link to="/communities">Communities</Link>
        </div>
        <div>
          <Link to="/create">Create a Song</Link>
        </div>
      </div>
      <div className="auth">
        {user?.id && (
          <div className="logged-in">
            <div className="link">
              <a href={`${config.API_ROOT}/profile/logout`}>Log Out</a>
            </div>
            <div>
              <ProfilePic
                picture={user.profilePic}
                color="light"
                size="small"
                email={user.email}
              />
            </div>
          </div>
        )}
        {!user?.id && <Link to="/login">Log In</Link>}
        {!user?.id && <Link to="/signup">Sign Up</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
