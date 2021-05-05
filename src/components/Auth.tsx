import "./form.css";
import config from "../config";
import { BaseSyntheticEvent, useState } from "react";
import axios from "axios";

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const formJSON = { email, password };
    const axiosConfig = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    };

    try {
      const res = await axios.post(url, formJSON, axiosConfig);
      window.location = res.data.redirect;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <div>
          <button className="live">Sign Up</button>
        </div>
        <div>
          <button className="live">
            <a href={`${config.API_ROOT}/auth/login/google`}>
              Sign Up with Google
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
