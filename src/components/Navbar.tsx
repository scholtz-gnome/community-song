import config from "../config";
import "./Navbar.css";
import { Link } from "react-router-dom";
import UserProps from "../interfaces/UserProps";

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
              {user.profilePic && (
                <img src={user.profilePic || ""} alt={user.email} />
              )}
              {user.profilePic === null && (
                <i className="far fa-user-circle"></i>
              )}
            </div>
          </div>
        )}
        {!user?.id && <Link to="/auth">Sign Up</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
