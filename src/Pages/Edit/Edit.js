import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RiImageEditLine } from "react-icons/ri";
import "./Edit.css";
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import WritePost from "../../context/WritePost";
import CategorySelector from "../../components/Catogories/CategorySelector";
import convertBinaryToBase64 from "../../components/BinarytoImage/convertBinaryToBase64";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import BlogContext from "../../context/BlogPost";

const initial = {
  id: "",
  imageData: "",
  title: "",
  description: "",
  date: "",
  categories: "",
};

const toolbarOptions2 = [
  ["bold", "italic", "underline", "strike"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["image", "video", "formula"],
  ["blockquote", "code-block"],
  ["clean"],
];

function Edit() {
  const { selectedCategories, setSelectedCategories } = useContext(WritePost);
  const { handleBlogs } = useContext(BlogContext);
  const [form, setForm] = useState(initial);
  const [value, setValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { title, imageData } = form;
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef();
  const imageSource = imageData ? convertBinaryToBase64(imageData) : null;
  const setSelectedCategoriesMemoized = useCallback(setSelectedCategories, [
    setSelectedCategories,
  ]);

  const fetchEditPost = useCallback(
    (id) => {
      axios
        .get(`https://personalblog-backend.onrender.com/blog/${id}`)
        .then((response) => {
          setForm(response.data);
          setValue(response.data.description);
          setSelectedCategoriesMemoized(response.data.categories);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setSelectedCategoriesMemoized]
  );

  useEffect(() => {
    fetchEditPost(id);
  }, [id, fetchEditPost]);

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
    const D = new Date();
    const fulldate = `${D.getMonth() + 1}/${D.getDate()}/${D.getFullYear()}`;
    const updatedForm = {
      ...form,
      description: value,
      categories: selectedCategories,
      date: fulldate,
    };

    // Check if a new file is selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedForm.imageData = reader.result.split(",")[1]; // Remove the data:image/... prefix

        axios
          .put(
            "https://personalblog-backend.onrender.com/blog",
            updatedForm,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Post successful:", response.data);
            handleBlogs();
            navigate("/");
          })
          .catch((error) => {
            console.error("Error posting data:", error);
          });
      };
      reader.readAsDataURL(file);
    } else if (imageData) {
      // Include the existing imageData as a base64 string
      updatedForm.imageData = imageData;

      axios
        .put(
          "https://personalblog-backend.onrender.com/blog",
          updatedForm,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Post successful:", response.data);
          handleBlogs();
          navigate("/");
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    } else {
      // No file and no existing imageData
      axios
        .put(
          "https://personalblog-backend.onrender.com/blog",
          updatedForm,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Post successful:", response.data);
          handleBlogs();
          navigate("/");
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  };

  return (
    <>
      <div className="write">
        <img className="writeImg" src={previewImage || imageSource} alt="" />
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
              value={title}
              onChange={handleFormChanges}
            />
          </div>
          <button type="submit" className="writeChange">
            Save Changes
          </button>
        </form>
        <CategorySelector />
        <div className="writeTextarea">
          <ReactQuill
            modules={{ toolbar: toolbarOptions2 }}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="preview">
          <h1 className="previewHeader">PREVIEW</h1>
          <div className="previewData">
            <ReactQuill value={value} readOnly={true} theme="bubble" />
          </div>
        </div>
      </div>
      <Backdrop open={loading} style={{ zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Edit;
