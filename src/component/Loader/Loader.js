import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
