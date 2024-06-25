import React, { useState } from "react";
import "./UpdatePassword.css";
import { useAuth } from "../../context/AuthContext";

function UpdatePassword() {
  const { updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (currentPassword === newPassword) {
      setError("New password cannot be the same as the current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    const result = await updatePassword(currentPassword, newPassword);
    if (result.success) {
      setSuccess(result.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(result.message);
    }
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
        <label>Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button className="password-submit" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
