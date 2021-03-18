import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { config } from "./config";
import { Auth0Provider } from "@auth0/auth0-react";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
    ,
  </HashRouter>,
  document.getElementById("root")
);
