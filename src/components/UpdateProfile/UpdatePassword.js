import React, { useContext, useState } from "react";
import "./UpdatePassword.css";
import UserContext from "../../context/UserDetails";

function UpdatePassword() {
  const { UpdatePassword } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentPassword === newPassword) {
      setError("New password cannot be the same as the current password.");
      return;
    }
    setError("");
    UpdatePassword(currentPassword, newPassword);
  };

  return (
    <div className="password-container">
      <form className="password-form" onSubmit={handleSubmit}>
        <label>Current Password</label>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <label>New Password</label>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button className="password-submit" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
