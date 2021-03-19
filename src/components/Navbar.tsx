import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
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
        <LoginButton />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
