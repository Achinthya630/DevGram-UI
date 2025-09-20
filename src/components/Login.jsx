import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setEmailId] = useState("achinthyaka@gmail.com");
  const [password, setPassword] = useState("Achinthya@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      //document.getElementById("status-message").innerHTML = error.response.data;
    }
  };

  return (
    <>
      <div className="flex justify-center mt-20 ">
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
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <div id="status-message" className="text-error flex justify-center">
              {error}
            </div>
            <div className="card-actions justify-center mt-10">
              <button className="btn btn-primary" onClick={loginHandler}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-20">
        New User? &nbsp;  
        <div> 
          <Link to={"/signup"} className="underline">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
