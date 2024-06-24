import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import PleaseLogin from "../../assets/PleaseLogin.json";
import "./LoginPrompt.css";

const LoginPrompt = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Write Blogs",
    "See Your Blogs",
    "Unlock Your Creativity",
    "Inspire and Be Inspired",
    "Have Seamless Blogging Experience",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="LoginPrompt">
      <h4 className="Login-header">Please Login to</h4>
      <Lottie loop animationData={PleaseLogin} play />
      <div className="Login-text">
        <div className="LoginPrompt-text">{texts[textIndex]}</div>
      </div>
    </div>
  );
};

export default LoginPrompt;
