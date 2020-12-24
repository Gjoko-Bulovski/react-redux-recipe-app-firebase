import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./ModalPortal.css";

const ModalPortal = ({ children }) => {
  const portal = document.createElement("div");
  portal.id = "modalPortal";
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(portal);
    portal.appendChild(el);
    return () => {
      document.body.removeChild(portal);
      portal.removeChild(el);
    };
  }, [portal, el]);

  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
