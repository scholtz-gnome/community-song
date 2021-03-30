import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Create from "./components/Create";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<string>("");
  const { isLoading } = useAuth0();

  useEffect(() => {
    fetch("https://community-song-api.herokuapp.com/")
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  }, []);

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
                <p className="App-intro">
                  The backend response is: {apiResponse}
                </p>
              </header>
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
