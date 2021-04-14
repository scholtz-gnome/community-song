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
import User from "./interfaces/UserInterface";

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
                    <h3>Welcome to Community Song, {user?.first_name}</h3>
                  )}
                </div>
              </header>
              <main>
                <SongList />
              </main>
            </Route>
            <Route path="/profile">
              <Profile user={user} />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/songs">
              <SongDisplay />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
