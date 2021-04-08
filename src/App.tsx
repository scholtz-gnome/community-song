import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Create from "./components/Create";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import config from "./config";
import axios from "axios";
import User from "./interfaces/UserInterface";
import Song from "./interfaces/SongInterface";

const getUserDetails = async (setUser: Function) => {
  try {
    const res = await axios.get(`${config.API_ROOT}/auth`, {
      withCredentials: true,
    });
    const userDetails: User = res.data;
    setUser(userDetails);
  } catch (err) {
    console.log(err);
  }
};

const getSongs = async (setSongs: Function) => {
  try {
    const res = await axios.get(`${config.API_ROOT}/songs`);
    const songs = res.data;
    setSongs(songs);
  } catch (err) {
    console.log(err);
  }
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const [songs, setSongs] = useState<Song[] | undefined>([]);

  useEffect(() => {
    getUserDetails(setUser);
    getSongs(setSongs);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <div>
          <Switch>
            <Route exact path="/">
              <header className="App-header">
                <h1>Community Song</h1>
                <div className="App-intro">
                  {user?.id && (
                    <p>Welcome to Community Song, {user?.first_name}</p>
                  )}
                </div>
              </header>
              <main>
                <ul>
                  {songs &&
                    songs.map((song, index) => (
                      <li key={index}>
                        <div></div>
                        <p>Title: {song.title}</p>
                        <p>Artist: {song.artist}</p>
                        <p>Added by: {song.first_name}</p>
                      </li>
                    ))}
                </ul>
              </main>
            </Route>
            <Route path="/profile">
              <Profile user={user} />
            </Route>
            <Route path="/create">
              <Create user={user} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
