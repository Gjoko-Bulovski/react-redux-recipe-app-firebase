import React from "react";

const Error = ({ title }) => {
  return <p style={{ color: "red", textAlign: "left" }}>{title}</p>;
};

export default Error;

Error.defaultProps = {
  title: "Please fill out this field",
};
