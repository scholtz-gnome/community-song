import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Create from "./components/Create";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const saveProfileDetails = async (user: any) => {
  try {
    await fetch("https://community-song-api.herokuapp.com/profile/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchSongList = async (setSongs: any) => {
  try {
    const res = await fetch("https://community-song-api.herokuapp.com/songs");
    const files = await res.json();
    return setSongs(files);
  } catch (err) {
    console.log(err);
  }
};

const App: React.FC = () => {
  const { isLoading, user, isAuthenticated } = useAuth0();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      saveProfileDetails(user);
    }
    fetchSongList(setSongs);
  }, [isAuthenticated, user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/">
              <header className="App-header">
                <h1>Community Song</h1>
                {isAuthenticated && (
                  <div className="App-intro">
                    Welcome to Community Song, {user.given_name}
                  </div>
                )}
              </header>
              <main>
                {songs.map((song, i) => (
                  <div key={i}>
                    <h3>Song Title: {song["title"]}</h3>
                    <p>Artist: {song["artist"]}</p>
                    <p>User ID: {song["user_id"]}</p>
                  </div>
                ))}
              </main>
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
