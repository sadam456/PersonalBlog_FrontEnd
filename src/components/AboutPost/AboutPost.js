import React, { useContext } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";
import "./AboutPost.css";
import { MdStar } from "react-icons/md";
import BlogContext from "../../context/BlogPost";
import convertBinaryToBase64 from "../BinarytoImage/convertBinaryToBase64";
const AboutPost = ({ post }) => {
  const { removeFavoritePosts } = useContext(BlogContext);
  const { categories, imageData } = post;
  const imageSource = imageData ? convertBinaryToBase64(imageData) : null;

  const handleDoubleClick = () => {
    removeFavoritePosts(post.id);
  };

  const rendercategories = categories.map((catg, i) => {
    return <span key={i}>{catg}</span>;
  });
  return (
    <div className="aboutpost">
      <div className="aboutpostImg">
        <img src={imageSource} alt={post.title} />
      </div>
      <div className="postIcons">
        <div className="postEdit">
          <MdStar
            className="favicon favorite"
            style={{ cursor: "pointer" }}
            onClick={handleDoubleClick}
          />
        </div>
      </div>
      <Link to={`/post/${post.id}`}>
        <div className="aboutpostInfo">
          <div className="aboutpostCatg">{rendercategories}</div>
          <div className="aboutpostTitle">{post.title}</div>
          <div className="aboutpostDate">{post.date}</div>
          <div className="aboutpostDescContainer">
            <ReactQuill
              value={post.description}
              readOnly={true}
              theme="bubble"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AboutPost;
