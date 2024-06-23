import React, { useContext } from "react";
import "./UpdateProfile.css";
import { FaUserCircle } from "react-icons/fa";
import UserContext from "../../context/UserDetails";

function UpdateProfile() {
  const {
    userProfile,
    previewImage,
    fileRef,
    imagesource,
    handleImageChange,
    handleFormChanges,
    UpdateProfile,
  } = useContext(UserContext);

  return (
    <div className="profile">
      <div className="profileWrapper">
        <div className="profileTitle">
          <h1 className="profileUpdateTitle">Update Your Account</h1>
          <h4 className="profileDeleteTitle">Delete Account</h4>
        </div>
        <form className="profileForm" onSubmit={UpdateProfile}>
          <label>Profile Picture</label>
          <div className="profilePicture">
            <img src={previewImage || imagesource} alt="" />
            <label htmlFor="fileInput">
              <FaUserCircle className="profileIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={handleImageChange}
              ref={fileRef}
              name="photo"
              style={{ display: "none" }}
            />
          </div>
          <label>About Myself</label>
          <textarea
            type="text"
            name="bio"
            onChange={handleFormChanges}
            value={userProfile.bio}
            placeholder="Write about yourself in short...."
            className="custom-textarea"
          />
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={handleFormChanges}
            value={userProfile.username}
            placeholder="user name"
            className="custom-placeholder"
          />
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleFormChanges}
            value={userProfile.firstName}
            placeholder="first name"
            className="custom-placeholder"
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleFormChanges}
            value={userProfile.lastName}
            placeholder="last name"
            className="custom-placeholder"
          />
          <button type="submit" className="profileSubmit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
