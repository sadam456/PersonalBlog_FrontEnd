import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Skills from "../../assets/Skills/Skills.json";
import UserContext from "../../context/UserDetails";
import BlogContext from "../../context/BlogPost";
import AboutPost from "../../components/AboutPost/AboutPost";
import animationFav from "../../assets/Favorite.json";
import Lottie from "react-lottie-player";
import { useAuth } from "../../context/AuthContext";
import {
  FaFacebook,
  FaInstagramSquare,
  FaPinterest,
  FaUserCircle,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const About = () => {
  const { userProfile, imagesource } = useContext(UserContext);
  const { favoritePosts } = useContext(BlogContext);
  const { currentUser } = useAuth();

  const renderFavPosts = () => {
    if (favoritePosts.length === 1) {
      return (
        <AboutPost
          post={favoritePosts[0]}
          key={favoritePosts[0].id}
          className="single-post"
        />
      );
    }
    return favoritePosts.slice(0, 4).map((post) => {
      return <AboutPost post={post} key={post.id} />;
    });
  };

  const renderFavTopics = () => {
    return userProfile.topics?.map((topic) => {
      return (
        <p className="item-fav" key={topic}>
          {topic}
        </p>
      );
    });
  };

  const renderInterests = () => {
    return userProfile.interests?.map((interest) => {
      return (
        <p className="item-fav" key={interest}>
          {interest}
        </p>
      );
    });
  };

  return (
    <div className="container">
      <div className="about-me">
        <div className="about-me-header">
        {currentUser ? (
            <img
              src={imagesource}
              alt={userProfile.firstName}
              className="profile-photo"
            />
          ) : (
            <FaUserCircle className="profile-photo1" />
          )}
          <h1 className="aboutmeh1">About Me</h1>
        </div>
        {userProfile.bio ? (
          <p className="bio">{userProfile.bio}</p>
        ) : (
          <div className="scrolling-text-container">
            <div className="scrolling-text">
              Write about yourself, your experience, your goals...
            </div>
          </div>
        )}
        <h1 className="aboutmeh1">My Skills</h1>
        <ul className="skills">
          {Skills.map((skill, index) => (
            <li key={index} className="skill">
              <span className="skill-icon">
                <img src={skill.icon} alt={skill.name} />
              </span>
              <span className="skill-name">{skill.name}</span>
            </li>
          ))}
        </ul>
        <div className="bottom-container">
          <div className="favposts">
            <h2 className="headerh2">Favorite Posts</h2>
            {favoritePosts.length === 0 ? (
              <div className="addfavdiv">
                <div className="lottie-player">
                  <Lottie loop animationData={animationFav} play />
                </div>
                <Link to={"/"}>
                  <button className="add-favorite-button">Add Favorites</button>
                </Link>
              </div>
            ) : (
              <div className="items-container">{renderFavPosts()}</div>
            )}
          </div>
          <div className="topics-interests-social-container">
            <div className="topics-interests-container">
              <div className="favtopics">
                <h2 className="headerh2">Favorite Topics</h2>
                <div className="items-fav-container">{renderFavTopics()}</div>
              </div>
              <div className="interests">
                <h2 className="headerh2">My Interests</h2>
                <div className="items-interest-container">
                  {renderInterests()}
                </div>
              </div>
            </div>
            <div className="social-media">
              <span className="socialTitle">Follow Me On !!!</span>
              <div className="social">
                {userProfile.socialMediaLinks && (
                  <>
                    <a
                      className="socialIcon"
                      href={userProfile.socialMediaLinks.facebook || "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        <FaFacebook />
                        <p>Facebook</p>
                      </span>
                    </a>
                    <a
                      className="socialIcon"
                      href={userProfile.socialMediaLinks.instagram || "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        <FaInstagramSquare />
                        <p>Instagram</p>
                      </span>
                    </a>
                    <a
                      className="socialIcon"
                      href={userProfile.socialMediaLinks.pinterest || "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        <FaPinterest />
                        <p>Pinterest</p>
                      </span>
                    </a>
                    <a
                      className="socialIcon"
                      href={userProfile.socialMediaLinks.twitter || "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        <FaSquareXTwitter />
                        <p>Twitter</p>
                      </span>
                    </a>
                    <a
                      className="socialIcon"
                      href={userProfile.socialMediaLinks.youtube || "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        <FaYoutube />
                        <p>Youtube</p>
                      </span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
