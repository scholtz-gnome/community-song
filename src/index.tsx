import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { config } from "./config";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
    ,
  </BrowserRouter>,
  document.getElementById("root")
);
