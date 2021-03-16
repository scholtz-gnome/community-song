export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <h1>Community Song</h1>
      <div className="links">
        <a href="http://localhost:4000/">Home</a>
        <a href="http://localhost:4000/create">Create</a>
      </div>
    </nav>
  );
};

export default Navbar;
