import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      navigate("*");
    }
  };

  const { firstName, lastName, age, gender, about, skills, _id, profilePage } = user;
  let showButtons = true;
  if(profilePage){
    showButtons = false;
  } 

  return (
    <div className="flex justify-center">
      <div className="card bg-base-200 w-96 shadow-sm mb-10 mt-8">
        <figure>
          <img src={user.photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age + ", " + gender}</p>
          <p>{about}</p>
          <div className="card-actions justify-items-start mt-5">
            {skills &&
              skills.map((skill, index) => (
                <div key={index} className="badge badge-outline">
                  {skill}
                </div>
              ))}
          </div>
              {showButtons && 
          <div className="card-actions justify-end mt-5">
            <button
              className="btn btn-error"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Skip
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
