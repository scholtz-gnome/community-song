import config from "../config";
import "./form.css";
import { BaseSyntheticEvent, useState } from "react";

const Login: React.FC = () => {
  const [message, setMessage] = useState("");

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    console.log(e.target);
  };
  return (
    <div>
      <form onSubmit={onSubmit} id="login-form">
        <div>
          <label className="labelName">Email</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label className="labelName">Password</label>
          <input type="password" name="password" required />
        </div>
        <div id="message">{message}</div>
        <div>
          <button className="form-button" form="login-form" type="submit">
            Log in
          </button>
        </div>
        <div>
          <button className="form-button" type="button">
            <a href={`${config.API_ROOT}/login/google`}>
              <img src="./google-logo.png" alt="google" />
              Log in with Google
            </a>
          </button>
        </div>
        <div>
          <button className="form-button" type="button">
            <a href={`${config.API_ROOT}/login/facebook`}>
              <img src="./facebook-logo.png" alt="facebook" />
              Log in with Facebook
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
