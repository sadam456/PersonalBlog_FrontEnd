import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SinglePost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaShare } from "react-icons/fa";
import ShareModal from "../../components/SharePost/ShareModal";
import Modal from "../../components/Modal/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import convertBinaryToBase64 from "../../components/BinarytoImage/convertBinaryToBase64";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const initial = {
  id: "",
  imageData: "",
  title: "",
  description: "",
  date: "",
  categories: [],
};

function SinglePost() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [post, setPost] = useState(initial);
  const { title, description, date, imageData } = post;
  const imageSource = imageData ? convertBinaryToBase64(imageData) : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shareUrl = `https://main--nimble-rugelach-59df20.netlify.app/blog/${id}`;

  const navigate = useNavigate();

  const fetchPost = async (id) => {
    try {
      const response = await axios.get(
        `https://main--nimble-rugelach-59df20.netlify.app/blog/${id}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const handleDeletePost = (id) => {
    async function deletePost() {
      try {
        await axios.delete(
          `https://main--nimble-rugelach-59df20.netlify.app/blog/${id}`
        );
        console.log("Delete successful");
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
    deletePost();
  };

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img className="singlePostImg" src={imageSource} alt="" />
          <h1 className="singlePostTitle">
            {title}
            <div className="singlePostEdit">
              <Link to={`/edit/${post.id}`}>
                <FaEdit className="singlePostEditIcon" />
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="singlePostShareIcon"
              >
                <FaShare />
              </button>
              <ShareModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                postUrl={shareUrl}
                postTitle={title}
              />
              <Modal onDelete={() => handleDeletePost(post.id)} />
            </div>
          </h1>
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author: <b>Rohith</b>
            </span>
            <span className="singlePostDate">{date}</span>
          </div>
          <div className="singlePostDesc">
            <ReactQuill value={description} readOnly={true} theme="bubble" />
          </div>
        </div>
      </div>
      <Backdrop open={loading} style={{ zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default SinglePost;
