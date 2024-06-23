import { RiImageEditLine } from "react-icons/ri";
import "./Write.css";
import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WritePost from "../../context/WritePost";
import CategorySelector from "../../components/Catogories/CategorySelector";
import imageHolder from "../../assets/imageholder.png";
const initial = {
  id: "",
  title: "",
  description: "",
  date: "",
  categories: "",
  favorite: false,
};

const toolbarOptions1 = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }], // lists
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }], // font family
  [{ align: [] }], // text align
  ["image", "video", "formula"], // media and formula
  ["blockquote", "code-block"], // blocks
  ["clean"], // remove formatting button
];
function Write() {
  const { selectedCategories } = useContext(WritePost);
  const [form, setForm] = useState(initial);
  const [value, setValue] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null); // Initialize file state with null
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const fileRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleFormChanges = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const CreateBlog = (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to publish a post.");
      navigate("/login");
      return;
    }

    const D = new Date();
    const fulldate = `${D.getMonth()}/${D.getDate()}/${D.getFullYear()}`;
    const updatedForm = {
      ...form,
      description: value,
      categories: selectedCategories,
      date: fulldate,
      userId: currentUser.uid,
    };

    const formData = new FormData();
    formData.append("post", JSON.stringify(updatedForm));
    if (file) {
      formData.append("file", file);
    }

    axios
      .post("http://localhost:8080/blogPost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Post successful:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  return (
    <div className="write">
      {previewImage ? (
        <img className="writeImg" src={previewImage} alt="" />
      ) : (
        <img className="writeImg" src={imageHolder} alt="" />
      )}
      <form className="writeForm" onSubmit={CreateBlog}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <RiImageEditLine className="writeIcon" />
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileRef}
            name="photo"
            id="fileInput"
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="writeInput"
            autoFocus={true}
            onChange={handleFormChanges}
          />
        </div>
        <button type="submit" className="writeSubmit" disabled={!currentUser}>
          Publish
        </button>
      </form>
      <CategorySelector />
      <div className="writeTextarea">
        <ReactQuill
          className="Editor"
          modules={{ toolbar: toolbarOptions1 }}
          theme="snow"
          value={value}
          onChange={setValue}
        />
        {/* <ReactQuill className="Editor" value={value} onChange={setValue} /> */}
      </div>
      <div className="preview">
        <h1 className="previewHeader">PREVIEW</h1>
        <div className="previewData">
          <ReactQuill value={value} readOnly={true} theme="bubble" />
        </div>
      </div>
      {!currentUser && (
        <p className="login-message">
          You must be logged in to publish a post.
        </p>
      )}
    </div>
  );
}

export default Write;
