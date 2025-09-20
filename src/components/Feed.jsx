import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showButtons = true;

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length <= 0) return (
    <div className="flex justify-center my-20 mb-120">No new users found</div>
  );

  return (
    feed && 
    (
      <>

        <UserCard user={feed[0]} />
      </>
    )
  );
};

export default Feed;
