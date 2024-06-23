import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../Search/Search";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import "./Header.css";
import UserContext from "../../context/UserDetails";
import { useAuth } from "../../context/AuthContext";
import {
  FaFacebook,
  FaInstagramSquare,
  FaPinterest,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const { imagesource } = useContext(UserContext);

  return (
    <div className="header">
      <div className="mobile-header">
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="social_media desktop-social">
          <a className="s_icon" href="/">
            <FaFacebook />
          </a>
          <a className="s_icon" href="/">
            <FaInstagramSquare />
          </a>
          <a className="s_icon" href="/">
            <FaPinterest />
          </a>
          <a className="s_icon" href="/">
            <FaSquareXTwitter />
          </a>
        </div>
        <div className="page_links">
          <div className={`list ${menuOpen ? "" : "open"}`}>
            <Link to={"/"} className="link-style" onClick={toggleMenu}>
              <FaHome className="icons" />
              Home
            </Link>
            <Link to={"/create"} className="link-style" onClick={toggleMenu}>
              <TfiWrite className="icons" />
              Write
            </Link>
            <Link to={"/about"} className="link-style" onClick={toggleMenu}>
              <FcAbout className="icons" />
              About
            </Link>
            <Link to={"/contact"} className="link-style" onClick={toggleMenu}>
              <MdOutlineContactSupport className="icons" />
              Contact
            </Link>
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="link-style logout-button"
              >
                <IoLogInOutline className="icons" />
                Logout
              </button>
            ) : (
              <Link to={"/login"} className="link-style" onClick={toggleMenu}>
                <IoLogInOutline className="icons" />
                Login/SignUp
              </Link>
            )}
            <div className="social_media mobile-social">
              <a className="s_icon" href="/">
                <FaFacebook />
              </a>
              <a className="s_icon" href="/">
                <FaInstagramSquare />
              </a>
              <a className="s_icon" href="/">
                <FaPinterest />
              </a>
              <a className="s_icon" href="/">
                <FaSquareXTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="profile_search">
          <Link to={"/profile"}>
            {imagesource && currentUser ? (
              <img src={imagesource} alt="" className="profileimg"></img>
            ) : (
              <FaUserCircle className="user_icon" />
            )}
          </Link>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Header;
