export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <h1>Community Song</h1>
      <div className="links">
        <a href="http://localhost:3000/">Home</a>
        <a href="http://localhost:3000/upload">Upload</a>
      </div>
    </nav>
  );
};

export default Navbar;
