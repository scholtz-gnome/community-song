import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Create from "./components/Create";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  const { isLoading, user, isAuthenticated } = useAuth0();

  const saveProfileDetails = async () => {
    await fetch("http://localhost:4000/profile/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      saveProfileDetails();
    }
  });

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
