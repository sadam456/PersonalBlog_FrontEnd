import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Skills from "../../assets/Skills/Skills.json";
import UserContext from "../../context/UserDetails";
import BlogContext from "../../context/BlogPost";
import AboutPost from "../../components/AboutPost/AboutPost";
import animationFav from "../../assets/Favorite.json";
import Lottie from "react-lottie-player";
import {
  FaFacebook,
  FaInstagramSquare,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

import { FaSquareXTwitter } from "react-icons/fa6";

const About = () => {
  const { userProfile, favtopic, interests, imagesource, socialmedialink } =
    useContext(UserContext);
  const { favoritePosts } = useContext(BlogContext);

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
    return favtopic.map((topic) => {
      return <p className="item-fav">{topic}</p>;
    });
  };

  const renderIntrests = () => {
    return interests.map((intrest) => {
      return <p className="item-fav">{intrest}</p>;
    });
  };

  return (
    <div className="container">
      <div className="about-me">
        <div className="about-me-header">
          <img
            src={imagesource}
            alt={userProfile.firstName}
            className="profile-photo"
          />
          <h1 className="aboutmeh1">About Me</h1>
        </div>
        <p className="bio">
          Hi, I'm John Doe, a passionate web developer with over 5 years of
          experience in building dynamic and responsive websites and
          applications. My journey in the tech world began with a fascination
          for coding during my college years, which quickly turned into a
          rewarding career. I specialize in frontend development with a strong
          focus on creating intuitive and user-friendly interfaces using HTML,
          CSS, and JavaScript. I'm also proficient in backend technologies such
          as Node.js and Python, enabling me to build robust and scalable web
          solutions.
        </p>
        <p className="bio">
          Throughout my career, I have worked on a variety of projects ranging
          from small business websites to large-scale applications for
          enterprise clients. I enjoy the challenge of solving complex problems
          and continuously learning new technologies to stay up-to-date with the
          latest industry trends. In my free time, I love contributing to
          open-source projects, blogging about my coding adventures, and
          mentoring aspiring developers.
        </p>
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
                  {" "}
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
              <div className="intrests">
                <h2 className="headerh2">My Interests</h2>
                <div className="items-intrest-container">
                  {renderIntrests()}
                </div>
              </div>
            </div>
            <div className="social-media">
              <span className="socialTitle">Follow Me On !!!</span>
              <div className="social">
                <a
                  className="sidebarIcon"
                  href={socialmedialink.facebook || "/"}
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
                  href={socialmedialink.instagram || "/"}
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
                  href={socialmedialink.pintrest || "/"}
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
                  href={socialmedialink.twitter || "/"}
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
                  href={socialmedialink.youtube || "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <FaYoutube />
                    <p>Youtube</p>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
