import React, { useState } from "react";
import { connect } from "react-redux";
import ModalPortal from "../UI/ModalPortal/ModalPortal";
import BackDrop from "../UI/BackDrop/BackDrop";
import "../ModalDelete/ModalDelete.css";
import { deleteRecipeAction } from "../../Actions/Actions";

const ModalDelete = ({ deleteRecipeAction, id, name }) => {
  const [showModal, setModal] = useState(false);

  const handleShow = () => setModal(true);
  const handleHide = () => {
    setModal(false);
  };

  return (
    <>
      <button className="btnDelete" onClick={handleShow}>
        Delete
      </button>
      {showModal && (
        <ModalPortal>
          <>
            <BackDrop show={showModal} clicked={handleHide} />
            <div className="modalContent">
              <div className="modalHeader">{name}</div>
              <p>Are you sure you want to delete ?</p>
              <div className="modalFooter">
                <button onClick={handleHide} className="btnCancel">
                  Cancel
                </button>
                <button
                  className="btnDelete"
                  onClick={() => deleteRecipeAction(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        </ModalPortal>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecipeAction: (id) => {
      dispatch(deleteRecipeAction(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalDelete);
