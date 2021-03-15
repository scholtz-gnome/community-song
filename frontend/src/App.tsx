import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Community Song</h1>
        <p className="App-intro">The backend response is: {apiResponse}</p>
      </header>
    </div>
  );
}

export default App;
