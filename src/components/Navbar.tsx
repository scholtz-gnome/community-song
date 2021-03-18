import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <h1>Community Song</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/create">Create</Link>
        <LoginButton />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
