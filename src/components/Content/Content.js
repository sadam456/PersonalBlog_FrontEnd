import React, { useContext } from "react";
import Lottie from "react-lottie-player";
import animationBlog from "../../assets/Blog.json";
import "./Content.css";
import UserContext from "../../context/UserDetails";
function Content() {
  const { userProfile } = useContext(UserContext);
  return (
    <div className="content">
      <div className="headerTitles">
        <span className="headerTitleSm">
          {userProfile.firstName ? userProfile.firstName + `'s` : "Your"} Personal
        </span>
        <span className="headerTitleLg">Blog</span>
        <Lottie
          loop
          animationData={animationBlog}
          play
          className="content_img"
        />
      </div>
    </div>
  );
}

export default Content;
