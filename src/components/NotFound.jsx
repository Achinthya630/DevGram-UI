import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <p className="text-error flex justify-center m-2">
        {" "}
        Oops! You tried searching something we can't understand.
      </p>
      <div className="flex justify-center m-3">
        <img
          src="https://wegotthiscovered.com/wp-content/uploads/2023/07/crying-cat.png"
          className="w-200"
        ></img>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
