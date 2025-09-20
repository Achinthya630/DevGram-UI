import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addRequests } from "../utils/requestSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);

  const fetchUser = async () => {
    try {
      if (userData) return;
      const publicPaths = ["/signup", "/login", "/notfound"];
      if (publicPaths.includes(location.pathname)) return;
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log("User not logged in");
    }
  };

  const fetchReqFunction = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      if (res.data && res.data.pendingRequests) {
        dispatch(addRequests(res.data.pendingRequests));
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchUser();
      if (userData) {
        await fetchReqFunction();
      }
    };

    initializeData();
  }, [userData]);

  const pendingRequestCount = requests ? requests.length : 0;

  return (
    <div>
      <NavBar pendingRequestCount={pendingRequestCount} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
