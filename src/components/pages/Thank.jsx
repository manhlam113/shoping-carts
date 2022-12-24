import React from "react";
import { NavLink } from "react-router-dom";

const Thank = () => {
  return (
    <div className="md:max-w-[1000px] shadow-md bg-white md:h-[300px] mx-auto my-10 rounded-md">
      <h1 className="text-center text-3xl p-10 text-primary">Thank You !!</h1>
      <p className="text-center text-2xl">
        Thank you for ordering from our website !
      </p>
      <div className="text-center mt-10">
        <button className="bg-primary mx-auto text-white rounded-md px-10 py-2">
          <NavLink to={"/home"}>Back to Home !</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Thank;
