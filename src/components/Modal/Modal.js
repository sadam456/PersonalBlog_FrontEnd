// SimpleModal.jsx
import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";
import { MdDelete } from "react-icons/md";

const Modal = ({ onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteIconRef.current &&
        !deleteIconRef.current.contains(event.target)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    onDelete();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div ref={deleteIconRef}>
        <MdDelete
          className="singlePostDeleteIcon"
          onClick={() => setShowModal(true)}
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
