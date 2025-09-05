import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="mb-120 flex justify-center">Welcome to your feed {user.firstName}!!</div>
    </>
  );
};

export default Feed;
