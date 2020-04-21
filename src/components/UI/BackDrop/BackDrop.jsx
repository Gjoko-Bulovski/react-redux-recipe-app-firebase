import React from "react";
import "./BackDrop.css";

const BackDrop = ({ show, clicked }) => {
  return show && <div className={`backDrop`} onClick={clicked} />;
};

export default BackDrop;
