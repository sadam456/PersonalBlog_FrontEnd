import React, { useState, useContext } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";
import { MdOutlineStarBorder, MdStar } from "react-icons/md";
import convertBinaryToBase64 from "../BinarytoImage/convertBinaryToBase64";
import BlogContext from "../../context/BlogPost";
function Post({ post }) {
  const { favoritePosts, addFavoritePost, removeFavoritePosts } =
    useContext(BlogContext);
  const { title, description, date, categories, imageData } = post;
  const imageSource = imageData ? convertBinaryToBase64(imageData) : null;
  const rendercategories = categories.map((catg, i) => {
    return (
      <span className="postCato" key={i}>
        {catg}
      </span>
    );
  });
  const shareUrl = `https://personalblog-backend.onrender.com/blog/${post.id}`;

  const [isFavorite, setIsFavorite] = useState(
    favoritePosts.some((favPost) => favPost.id === post.id)
  );

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      addFavoritePost(post);
      setIsFavorite(true);
    } else {
      removeFavoritePosts(post.id);
      setIsFavorite(false);
    }
  };

  const handleDoubleClick = () => {
    removeFavoritePosts(post.id);
    setIsFavorite(false);
  };

  return (
    <div className="post">
      <div className="postImg">
        <img src={imageSource} alt="" />
      </div>
      <div className="postIcons">
        <div className="postEdit">
          {isFavorite ? (
            <MdStar
              className="favicon favorite"
              style={{ cursor: "pointer" }}
              onClick={handleFavoriteClick}
              onDoubleClick={handleDoubleClick}
            />
          ) : (
            <MdOutlineStarBorder
              className="favicon"
              style={{ cursor: "pointer" }}
              onClick={handleFavoriteClick}
              onDoubleClick={handleDoubleClick}
            />
          )}
        </div>
        <div className="shareIcons">
          <FacebookShareButton
            className="shareIcon"
            url={shareUrl}
            quote={title}
          >
            <FaFacebook />
          </FacebookShareButton>
          <WhatsappShareButton
            className="shareIcon"
            url={shareUrl}
            title={title}
          >
            <FaWhatsapp />
          </WhatsappShareButton>
          <PinterestShareButton
            className="shareIcon"
            url={shareUrl}
            title={title}
          >
            <FaPinterest />
          </PinterestShareButton>
          <TwitterShareButton
            className="shareIcon"
            url={shareUrl}
            title={title}
          >
            <FaSquareXTwitter />
          </TwitterShareButton>
        </div>
      </div>
      <Link to={`/blog/${post.id}`}>
        <div className="postInfo">
          <div className="postCatg">{rendercategories}</div>
          <span className="postTitle">{title}</span>
          <br />
          <span className="postDate">{date}</span>
          <div className="postDescContainer">
            <div className="postDesc">
              <ReactQuill value={description} readOnly={true} theme="bubble" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
