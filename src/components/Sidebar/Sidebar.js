import { React, useContext } from "react";
import "./Sidebar.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import WritePost from "../../context/WritePost";
import BlogContext from "../../context/BlogPost";
import UserContext from "../../context/UserDetails";
function Sidebar() {
  const { categories } = useContext(WritePost);
  const { userProfile, imagesource } = useContext(UserContext);
  const { handlePostsByCategory } = useContext(BlogContext);

  const rendereCatogries = categories.map((category, i) => {
    return (
      <li
        className="sidebarListItem"
        onClick={() => handlePostsByCategory(category)}
        key={i}
      >
        {category}
      </li>
    );
  });
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={imagesource} alt="" />
        <span className="aboutme">{userProfile.bio}</span>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">{rendereCatogries}</ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">SHARE THIS BLOG</span>
        <div className="sidebarSocial">
          <a className="sidebarIcon" href="/">
            <FaFacebook />
          </a>
          <a className="sidebarIcon" href="/">
            <FaInstagramSquare />
          </a>
          <a className="sidebarIcon" href="/">
            <FaPinterest />
          </a>
          <a className="sidebarIcon" href="/">
            <FaSquareXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
