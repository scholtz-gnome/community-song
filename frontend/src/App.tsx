import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const { isLoading } = useAuth0();

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <Navbar />
      <LoginButton />
      <LogoutButton />
      <Profile />
      <header className="App-header">
        <h1>Community Song</h1>
        <p className="App-intro">The backend response is: {apiResponse}</p>
      </header>
    </div>
  );
}

export default App;
