import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MDBBtn } from "mdb-react-ui-kit";
import BlogContext from "../../context/BlogPost";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f8f9fa",
  outline: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: 1300, // Adjusted to a direct value
  p: 4,
  border: "none",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
};

function ErrorModal({ isOpen, toggle, title, body }) {
  const { handleFilter } = useContext(BlogContext);
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to home
  const handleGoHome = () => {
    navigate("/");
    handleFilter();
    toggle(); // Navigate to home
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      toggle(); // You can modify this to control exactly when the modal should close
    }
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {body}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "auto" }}>
          <MDBBtn
            onClick={handleGoHome}
            color="Primary"
            style={{
              backgroundColor: "#4CAF50",
              borderRadius: "20px",
              color: "white",
              textTransform: "none",
              marginTop: "10px",
              maxWidth: "120px", // Adjusted to auto to accommodate longer text
              minWidth: "120px", // Ensures it doesn't get smaller than 120px
              fontSize: "16px",
              border: "2px solid",
              outline: "none",
              boxShadow: "none",
              height: "40px", // Fixed height to prevent resizing
              padding: "8px 12px", // May need to adjust if text still wraps
              lineHeight: "24px", // Center text vertically
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap", // Prevents text from wrapping
            }}
          >
            Go To Home
          </MDBBtn>
        </Box>
      </Box>
    </Modal>
  );
}

export default ErrorModal;
