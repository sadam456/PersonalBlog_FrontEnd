import { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import convertBinaryToBase64 from "../components/BinarytoImage/convertBinaryToBase64.js";
import { useAuth } from "./AuthContext.js";
const UserContext = createContext();
const initial = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  profilePic: "",
  bio: "",
  skills: [],
  interests: [],
  topics: [],
  socialMediaLinks: {
    facebook: "",
    instagram: "",
    linkedIn: "",
    twitter: "",
    pinterest: "",
    youtube: "",
  },
};

function ProviderUser({ children }) {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(initial);
  const [previewImage, setPreviewImage] = useState(null);
  const [favtopic, setFavtopic] = useState([]);
  const [interests, setInterests] = useState([]);
  const [socialmedialink, setSocialMediaLink] = useState(
    initial.socialMediaLinks
  );
  const [file, setFile] = useState("");
  const { profilePic } = userProfile;
  const navigate = useNavigate();
  const fileRef = useRef();

  const handlesocialChange = (event) => {
    const { name, value } = event.target;
    setSocialMediaLink((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handlenewfavtopics = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTopic = event.target.value.trim();
      if (newTopic) {
        setFavtopic([...favtopic, newTopic]);
        event.target.value = "";
      }
    }
  };

  const handleRemovetopic = (topicToRemove) => {
    setFavtopic(favtopic.filter((topic) => topic !== topicToRemove));
  };

  const handlenewIntrest = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newInterest = event.target.value.trim();
      if (newInterest) {
        setInterests([...interests, newInterest]);
        event.target.value = "";
      }
    }
  };
  const handleRemoveIntrest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const imagesource = profilePic ? convertBinaryToBase64(profilePic) : null;

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

  useEffect(() => {
    const getUserDetails = async () => {
      if (currentUser) {
        const response = await axios.get(
          `https://main--nimble-rugelach-59df20.netlify.app/api/users/${currentUser.uid}`
        );
        setUserProfile(response.data);
      }
    };

    if (currentUser) {
      getUserDetails();
    }
  }, [currentUser]);

  const handleFormChanges = (event) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const UpdateProfile = (event) => {
    event.preventDefault();

    const updatedUserProfile = {
      ...userProfile,
      topics: favtopic,
      interests: interests, // Ensures the correct assignment
      socialMediaLinks: socialmedialink,
    };

    const formData = new FormData();
    formData.append("post", JSON.stringify(updatedUserProfile));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        userProfile.profilePic = reader.result.split(",")[1]; // Remove the data:image/... prefix
        axios
          .put(
            "https://main--nimble-rugelach-59df20.netlify.app/api/users",
            updatedUserProfile,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            //console.log("Post successful:", response.data);
            navigate("/");
          })
          .catch((error) => {
            console.error("Error posting data:", error);
          });
      };
      reader.readAsDataURL(file);
    } else if (profilePic) {
      // Include the existing profilePic as a base64 string
      userProfile.profilePic = profilePic;

      axios
        .put(
          "https://main--nimble-rugelach-59df20.netlify.app/api/users",
          updatedUserProfile,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Post successful:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    } else {
      // No file and no existing profilePic
      axios
        .put(
          "https://main--nimble-rugelach-59df20.netlify.app/api/users",
          updatedUserProfile,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          //console.log("Post successful:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  };

  const UpdatePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put(
        "https://main--nimble-rugelach-59df20.netlify.app/user/updatepassword",
        {
          currentPassword,
          newPassword,
        }
      );
      //console.log("Password update successful:", response.data);
      // Optionally, navigate or provide feedback to the user
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const valueToShare = {
    userProfile,
    previewImage,
    fileRef,
    imagesource,
    favtopic,
    interests,
    socialmedialink,
    handlenewIntrest,
    handleRemoveIntrest,
    handleImageChange,
    handleFormChanges,
    UpdatePassword,
    UpdateProfile,
    handlenewfavtopics,
    handlesocialChange,
    handleRemovetopic,
  };
  return (
    <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>
  );
}

export { ProviderUser };
export default UserContext;
