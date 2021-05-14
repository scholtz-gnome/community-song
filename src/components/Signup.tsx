import "./form.css";
import config from "../config";
import { BaseSyntheticEvent, useState } from "react";
import axios from "axios";

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const onUsernameChange = (e: BaseSyntheticEvent) => {
    const trimmedUsername: string = e.target.value.trim();
    setUsername(trimmedUsername);
  };

  const onEmailChange = (e: BaseSyntheticEvent) => {
    const trimmedEmail: string = e.target.value.trim();
    setEmail(trimmedEmail);
  };

  const onPasswordChange = (e: BaseSyntheticEvent) => {
    const trimmedPassword: string = e.target.value.trim();
    setPassword(trimmedPassword);
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const url = `${config.API_ROOT}/auth/login/local`;
    const formJSON = { username, email, password };
    const axiosConfig = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    };

    try {
      const res = await axios.post(url, formJSON, axiosConfig);
      console.log(res.data);
      if (!res.data.message) {
        window.location = res.data.redirect;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} id="signup-form">
        <div>
          <label className="labelName">Username</label>
          <input
            type="text"
            name="username"
            required
            onInput={onUsernameChange}
          />
        </div>
        <div>
          <label className="labelName">Email</label>
          <input type="email" name="email" required onInput={onEmailChange} />
        </div>
        <div>
          <label className="labelName">Password</label>
          <input
            type="password"
            name="password"
            required
            onInput={onPasswordChange}
          />
        </div>
        <div id="message">{message}</div>
        <div>
          <button className="form-button" form="login-form" type="submit">
            Sign up
          </button>
        </div>
        <div>
          <button className="form-button" type="button">
            <a href={`${config.API_ROOT}/signup/google`}>
              <img src="./google-logo.png" alt="google" />
              Sign up with Google
            </a>
          </button>
        </div>
        <div>
          <button className="form-button" type="button">
            <a href={`${config.API_ROOT}/signup/facebook`}>
              <img src="./facebook-logo.png" alt="facebook" />
              Sign up with Facebook
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
