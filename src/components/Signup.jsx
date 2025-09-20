import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [emailID, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [errorMessage, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!emailID) e.emailID = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(emailID)) e.emailID = "Enter a valid email";

    if (!password) e.password = "Password is required";
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password))
      e.password =
        "Password must be ≥8 chars, include upper & lower case letters and a number";

    if (!firstName) e.firstName = "First name is required";
    if (!lastName) e.lastName = "Last name is required";

    if (age === "" || age === null) e.age = "Age is required";
    else if (Number(age) < 18) e.age = "You must be at least 18";

    if (!gender) e.gender = "Gender is required";

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
    setError("");
    setFieldErrors({});
    if (!validate()) return;

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailID,
          password,
          firstName,
          lastName,
          age,
          gender,
        },
        { withCredentials: true }
      );

      // backend might return user under res.data or res.data.data
      const userObj = res?.data?.data ?? res?.data ?? res;
      dispatch(addUser(userObj));
      return navigate("/");
    } catch (error) {
      const resp = error?.response?.data;
      // if backend returns field errors as object, map them
      if (resp && typeof resp === "object") {
        // Try common shapes: { emailID: 'msg' } or { errors: { ... } } or message string
        if (resp.errors && typeof resp.errors === "object") {
          setFieldErrors(resp.errors);
        } else {
          // copy known keys
          const newFieldErrors = {};
          [
            "emailID",
            "firstName",
            "lastName",
            "age",
            "gender",
            "password",
          ].forEach((k) => {
            if (resp[k]) newFieldErrors[k] = resp[k];
          });
          if (Object.keys(newFieldErrors).length) {
            setFieldErrors(newFieldErrors);
          } else {
            setError(typeof resp === "string" ? resp : "Something went wrong");
          }
        }
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-8 mb-5">
        <div className="card card-dash bg-base-300 w-150 ">
          <div className="card-body">
            <h2 className="card-title  flex justify-center">Signup</h2>
            <div className="flex justify-evenly">
              <fieldset className="fieldset w-60">
                <legend className="fieldset-legend">Email</legend>

                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    required
                    value={emailID}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </label>
                {fieldErrors.emailID && (
                  <div className="text-error text-sm mt-1">
                    {fieldErrors.emailID}
                  </div>
                )}
              </fieldset>
              <fieldset className="fieldset  w-60">
                <legend className="fieldset-legend">Password</legend>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    minLength={8}
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
                {fieldErrors.password && (
                  <div className="text-error text-sm mt-1">
                    {fieldErrors.password}
                  </div>
                )}
              </fieldset>
            </div>

            <div className="flex justify-evenly">
              <fieldset className="fieldset w-60">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {fieldErrors.firstName && (
                  <div className="text-error text-sm mt-1">
                    {fieldErrors.firstName}
                  </div>
                )}
              </fieldset>
              <fieldset className="fieldset  w-60">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {fieldErrors.lastName && (
                  <div className="text-error text-sm mt-1">
                    {fieldErrors.lastName}
                  </div>
                )}
              </fieldset>
            </div>

            <div className="flex justify-evenly">
              <fieldset className="fieldset w-60">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input validator "
                  placeholder="Age"
                  min="18"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {fieldErrors.age && (
                  <div className="text-error text-sm mt-1">
                    {fieldErrors.age}
                  </div>
                )}
              </fieldset>

              <fieldset className="fieldset w-60">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  defaultValue=""
                  className="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Pick a gender
                  </option>
                  <option>male</option>
                  <option>female</option>
                  <option>others</option>
                </select>
                {fieldErrors.gender && (
                  <div className="text-error text-sm mt-1">
                    {fieldErrors.gender}
                  </div>
                )}
              </fieldset>
            </div>

            <div className="text-error flex justify-center">{errorMessage}</div>
            <div className="card-actions justify-center mt-5">
              <button className="btn btn-primary" onClick={handleSignup}>
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-20">
        Already have an account? &nbsp;
        <div>
          <Link to={"/login"} className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
