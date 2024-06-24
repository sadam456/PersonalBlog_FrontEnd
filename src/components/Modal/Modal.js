import React, { useState } from "react";
import "./Modal.css";
import { MdDelete } from "react-icons/md";

const Modal = ({ onDelete, postId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    //console.log("Delete button clicked");
    onDelete(postId);
    setShowModal(false);
  };

  const handleCancel = () => {
    //console.log("Cancel button clicked");
    setShowModal(false);
  };

  return (
    <>
      <div>
        <MdDelete
          className="singlePostDeleteIcon"
          onClick={() => {
            //console.log("Delete icon clicked");
            setShowModal(true);
          }}
        />
      </div>
      {showModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h3>Delete Blog</h3>
            <p>Are you sure you want to delete this blog?</p>
            <div className="delete-modal-actions">
              <button
                className="delete-modal-button confirm"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="delete-modal-button cancel"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
