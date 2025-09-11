import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewedUser, setReviewedUser] = useState("");
  const [review, setReview] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.pendingRequests));

      if (!res) return;
    //   if (res.data.pendingRequests.length == 0) {
    //     setPendingRequests("false");
    //   }
    } catch (error) {
      navigate("*");
    }
  };

  const reviewRequest = async (status, id, userName) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
      setReviewedUser(userName);
      setReview(status === "accepted" ? "accepted" : "rejected");
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(false);
        setReviewedUser("");
        setReview("");
      }, 3000);
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

    if (requests && requests.length === 0)
    return <h1 className="flex justify-center my-10 mb-120"> No Pending Requests</h1>;

  return (
    <>
      {reviewSuccess && (
        <div
          role="alert"
          className="alert alert-success fixed top-20 right-0 left-0 z-50"
        >
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
          <span>
            {reviewedUser} has been {review}
          </span>
        </div>
      )}
      <div className="text-2xl text-center my-6">Connection Requests</div>
      {/* {pendingRequests && <div>No new requests</div>} */}
      <div className="flex justify-center">
        {requests && (
          <div>
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-base-300 border-base-300 collapse border w-180 mb-2"
              >
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-base-300 peer-checked:bg-secondary peer-checked:text-secondary-content">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="btn-ghost btn-circle avatar">
                        <div className="w-25 rounded-full">
                          <img
                            alt="Profile Photo"
                            src={request.fromUserID.photoUrl}
                          />
                        </div>
                      </div>
                      <div className="ml-5">
                        <h2 className="card-title mt-3">
                          {request.fromUserID.firstName}{" "}
                          {request.fromUserID.lastName}
                        </h2>
                        <p>
                          {request.fromUserID.age}, {request.fromUserID.gender}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center relative z-50">
                      <button
                        className="btn btn-soft btn-success pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          const fullName = `${request.fromUserID.firstName} ${request.fromUserID.lastName}`;
                          reviewRequest("accepted", request._id, fullName);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-soft btn-error pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          const fullName = `${request.fromUserID.firstName} ${request.fromUserID.lastName}`;
                          reviewRequest("rejected", request._id, fullName);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                  <p>{request.fromUserID.about}</p>
                  <div className="card-actions justify-items-start mt-5">
                    {request.fromUserID.skills &&
                      request.fromUserID.skills.map((skill, index) => (
                        <div key={index} className="badge badge-outline">
                          {skill}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-50 mt-50"></div>
    </>
  );
};

export default Requests;
