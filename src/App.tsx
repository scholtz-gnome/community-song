import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Create from "./components/Create";
import SongList from "./components/SongList";
import SongDisplay from "./components/SongDisplay";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import config from "./config";
import axios from "axios";
import User from "./interfaces/User";

const getUserDetails = async (setUser: Function) => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("CSRF-TOKEN"))
    ?.split("=")[1];
  const axiosConfig = {
    withCredentials: true,
    headers: { "X-CSRF-TOKEN": csrfToken },
  };
  try {
    const res = await axios.get(`${config.API_ROOT}/auth`, axiosConfig);
    const userDetails: User = res.data;

    setUser(userDetails);
  } catch (err) {
    console.log(err);
  }
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getUserDetails(setUser);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <div>
          <Switch>
            <Route exact path="/">
              <header>
                <h1>Community Song</h1>
                <div className="App-intro">
                  {user?.id && (
                    <h3>Welcome to Community Song, {user?.firstName}</h3>
                  )}
                </div>
              </header>
              <main className="outline">
                <SongList />
              </main>
            </Route>
            <Route path="/profile">
              {user && (
                <header>
                  <h1>Profile</h1>
                  <h3>View your profile details and added songs</h3>
                </header>
              )}
              <main className="outline">
                <Profile user={user} />
              </main>
            </Route>
            <Route path="/create">
              <header>
                <h1>Create</h1>
                <h3>Create a song and upload it to community song</h3>
              </header>
              <main className="outline">
                <Create />
              </main>
            </Route>
            <Route path="/songs">
              <SongDisplay user={user} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
