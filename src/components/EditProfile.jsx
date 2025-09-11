import React, { useState } from "react";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [currentSkill, setCurrentSkill] = useState("");
  const [skills, setSkills] = useState(user.skills || []);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [errorMessage, setError] = useState("");
  const [updatedSucess, setUpdateSuccess] = useState("");
  const dispatch = useDispatch();
  const gender = user.gender;

  const handleSkillInput = (e) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault(); // Prevent form submission
      if (!skills.includes(currentSkill.trim())) {
        setSkills([...skills, currentSkill.trim()]);
      }
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, photoUrl, skills },
        { withCredentials: true }
      );
      // console.log("Response from server:", res.data);
      dispatch(addUser(res?.data?.data));

      
      setUpdateSuccess("true");

      setTimeout(() => {
        setUpdateSuccess("");
      }, 3000);
      setTimeout(() => {
        location.reload()
      }, 3000);
      // location.reload();
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };


  //   React.useEffect(() => {
  //   setFirstName(user.firstName);
  //   setLastName(user.lastName);
  //   setAge(user.age);
  //   setAbout(user.about);
  //   setPhotoUrl(user.photoUrl);
  //   setSkills(user.skills || []);
  // }, [user]);


  return (
    <>
      {updatedSucess && (
        <div role="alert" className="alert alert-success fixed top-0 right-0 left-0 z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your profile has been updated successfully</span>
        </div>
      )}
      <div className="flex justify-center">
        <div className="mr-20">
          {user && (
            <UserCard
              user={{ firstName, lastName, age, about, photoUrl, skills, gender }}
            />
          )}
        </div>
        <div className="flex justify-center mt-8 mb-30">
          <div className="card card-dash bg-base-300 w-150 ">
            <div className="card-body">
              <h2 className="card-title ml-5 ">Edit Profile</h2>
              <div className="flex justify-evenly">
                <fieldset className="fieldset w-60">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder=""
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset  w-60">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder=""
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>

              <fieldset className="fieldset flex justify-center">
                <legend className="fieldset-legend ml-6">About</legend>
                <textarea
                  className="textarea h-24 w-125"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>

              <div className="flex justify-evenly">
                <fieldset className="fieldset w-60">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input"
                    placeholder=""
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset w-60">
                  <legend className="fieldset-legend">Profile Photo URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    placeholder=""
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>

              <fieldset className="fieldset flex flex-col justify-center">
                <legend className="fieldset-legend ml-6">Skills</legend>
                <div className="flex flex-wrap gap-2 mb-2 ml-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="badge badge-outline gap-2">
                      {skill}
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => removeSkill(skill)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={currentSkill}
                  className="input w-125 ml-6"
                  placeholder="Type a skill and press Enter"
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={handleSkillInput}
                />
              </fieldset>

              <div className="text-error flex justify-center">
                {errorMessage}
              </div>
              <div className="card-actions justify-center mt-5">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
