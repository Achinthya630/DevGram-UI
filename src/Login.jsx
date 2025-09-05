import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailID, setEmailId] = useState("achinthyaka@gmail.com");
  const [password, setPassword] = useState("Achinthya@123");

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("error:" + error.message);
    }
  };

  return (
    <div className="flex justify-center mt-20 mb-40">
      <div className="card card-dash bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              value={emailID}
              className="input"
              placeholder="Enter your Email"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mb-10">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              className="input"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={loginHandler}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
