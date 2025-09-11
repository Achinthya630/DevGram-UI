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
      {connections.map((connection) => (
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
      ))}
    </div>
  );
};

export default Connections;
