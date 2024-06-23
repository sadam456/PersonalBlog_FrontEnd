import React, { useContext } from "react";
import "./UpdateAboutMe.css";
import UserContext from "../../context/UserDetails";
import { TiDelete } from "react-icons/ti";
function UpdateAboutMe() {
  const {
    favtopic,
    interests,
    socialmedialink,
    handlenewfavtopics,
    handleRemovetopic,
    handlenewIntrest,
    handleRemoveIntrest,
    handlesocialChange,
    UpdateProfile,
  } = useContext(UserContext);
  const handlefavChange = (event) => {
    handlenewfavtopics(event);
  };

  const handledeletefavChange = (topic) => {
    handleRemovetopic(topic);
  };

  const handleintrestChange = (event) => {
    handlenewIntrest(event);
  };

  const handledeleteIntrest = (intrest) => {
    handleRemoveIntrest(intrest);
  };

  const handleSocialChange = (event) => {
    handlesocialChange(event);
  };

  return (
    <div className="update-aboutme">
      <div className="update-fav-int-soci">
        <div className="update-fav-topics">
          <h3>Add Favorite Topics</h3>
          <input
            placeholder="Add Favorite Topics"
            className="update-input"
            onKeyDown={handlefavChange}
          />
          <h4>Favorite Topics</h4>
          <div className="selected-topics">
            {favtopic.map((topic) => (
              <div key={topic} className="selected-topic">
                {topic}{" "}
                <button onClick={() => handledeletefavChange(topic)}>
                  <TiDelete className="delete-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="update-fav-intrests">
          <h3>Add Intrests </h3>
          <input
            placeholder="Add intrests"
            className="update-input"
            onKeyDown={handleintrestChange}
          />
          <h4>Intrests</h4>
          <div className="selected-topics">
            {interests.map((interest) => (
              <div key={interest} className="selected-topic">
                {interest}{" "}
                <button onClick={() => handledeleteIntrest(interest)}>
                  <TiDelete className="delete-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="Update-soci-links">
          <div>
            <h3>Facebook</h3>
            <input
              name="facebook"
              value={socialmedialink.facebook}
              placeholder="Add Facebook Profile link"
              className="update-soci"
              onChange={handleSocialChange}
            />
          </div>
          <div>
            <h3>Instagram</h3>
            <input
              name="instagram"
              value={socialmedialink.instagram}
              placeholder="Add Instagram Profile link"
              className="update-soci"
              onChange={handleSocialChange}
            />
          </div>
          <div>
            <h3>LinkedIn</h3>
            <input
              name="linkedIn"
              value={socialmedialink.linkedIn}
              placeholder="Add LinkedIn Profile link"
              className="update-soci"
              onChange={handleSocialChange}
            />
          </div>
          <div>
            <h3>Pintrest</h3>
            <input
              name="pintrest"
              value={socialmedialink.pintrest}
              placeholder="Add Pintrest Profile link"
              className="update-soci"
              onChange={handleSocialChange}
            />
          </div>
          <div>
            <h3>Twitter</h3>
            <input
              name="twitter"
              value={socialmedialink.twitter}
              placeholder="Add Twitter Profile link"
              className="update-soci"
              onChange={handleSocialChange}
            />
          </div>
          <div>
            <h3>Youtube</h3>
            <input
              name="youtube"
              value={socialmedialink.youtube}
              placeholder="Add Youtube Profile link"
              className="update-soci"
              onChange={handleSocialChange}
            />
          </div>
        </div>
      </div>
      <button className="update-button" onClick={UpdateProfile}>
        Update
      </button>
    </div>
  );
}

export default UpdateAboutMe;
