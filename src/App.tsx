import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Create from "./components/Create";
import SongList from "./components/SongList";
import SongDisplay from "./components/SongDisplay";
import Signup from "./components/Signup";
import Login from "./components/Login";
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
            <Route path="/communities">
              <header>
                <h1>Communities</h1>
                <p>
                  Not all communities are publicly visible.{" "}
                  <a href="/signup">Sign up</a> to find others.
                </p>
              </header>
            </Route>
            <Route exact path="/songs">
              <header>
                <h1>Songs</h1>
                <p>
                  Not all songs are publicly visible.{" "}
                  <a href="/signup">Sign up to find others.</a>
                </p>
              </header>
            </Route>
            <Route exact path="/create">
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
            <Route exact path="/signup">
              <header>
                <h1>Sign Up</h1>
                <h3>Sign up for a Community Song account</h3>
                <p>
                  Already registered? <a href="/login">Log in here</a>
                </p>
              </header>
              <main className="outline">
                <Signup />
              </main>
            </Route>
            <Route exact path="/login">
              <header>
                <h1>Log In</h1>
                <h3>Log in to your Community Song account</h3>
              </header>
              <main className="outline">
                <Login />
              </main>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
