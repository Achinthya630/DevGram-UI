import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.Connections);
      dispatch(addConnections(res.data.Connections));
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0) {
    return (
      <div className="flex justify-center mt-15 my-120 text-2xl">
        No Connections found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4">
      <div className="text-2xl text-center my-6">My Connections</div>
      {/* {connections.map((connection) => (
        <div className="card bg-base-300 w-full shadow-sm my-3">
          <div className="card-body">
            <div className="flex justify-evenly">
              <div className="btn-ghost btn-circle avatar w-20">
                <div className="w-20 rounded-full">
                  <img alt="Profile Photo" src={connection.photoUrl} />
                </div>
              </div>
              <div className="ml-5 flex-1">
                <h2 className="card-title">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p>
                  {connection.age}, {connection.gender}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))} */}
      {connections.map((connection) => (
              <div
                
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
                            src={connection.photoUrl}
                          />
                        </div>
                      </div>
                      <div className="ml-5">
                        <h2 className="card-title mt-3">
                          {connection.firstName}{" "}
                          {connection.lastName}
                        </h2>
                        <p>
                          {connection.age}, {connection.gender}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                  <p>{connection.about}</p>
                  <div className="card-actions justify-items-start mt-5">
                    {connection.skills &&
                      connection.skills.map((skill, index) => (
                        <div key={index} className="badge badge-outline">
                          {skill}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-70 "></div>
    </div>
  );
};

export default Connections;
