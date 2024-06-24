import React, { useContext, useState, useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import BlogContext from "../../context/BlogPost";
import ErrorModal from "../ErrorModal/ErrorModal";
import Lottie from "react-lottie-player";
import animationdata from "../../assets/Animation.json";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import SimpleLoader from "../SimpleLoader/SimpleLoader";
import LoginPrompt from "../LoginPrompt/LoginPrompt";
import { useAuth } from "../../context/AuthContext";

function Posts() {
  const { data, filteron, loadingStatus, handleFilter, handleBlogs } =
    useContext(BlogContext);
  const { currentUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    if (currentUser) {
      handleBlogs();
    }
  }, [currentUser, handleBlogs]);

  useEffect(() => {
    if (data.length === 0 && filteron) {
      setShowModal(true);
      setModalContent({
        title: "No Posts in Selected Category",
        body: "No posts available for this category.",
      });
    }
  }, [data, filteron]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "category") {
      return a.categories[0].localeCompare(b.categories[0]);
    }
    return 0;
  });

  const renderPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const selectedPosts = sortedData.slice(
      startIndex,
      startIndex + postsPerPage
    );

    if (selectedPosts.length === 0 && !filteron) {
      return <Lottie loop animationData={animationdata} play />;
    } else if (selectedPosts.length > 0) {
      return selectedPosts.map((post) => <Post post={post} key={post.id} />);
    }
    return null;
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderContent = () => {
    if (!currentUser) {
      return <LoginPrompt />;
    }

    if (loadingStatus === "loading") {
      return <SimpleLoader />;
    }

    if (loadingStatus === "error") {
      return <div>Error loading posts. Please try again later.</div>;
    }

    return (
      <>
        <div className={filteron ? "postsfilter" : "posts"}>
          {renderPosts()}
        </div>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(sortedData.length / postsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
      </>
    );
  };

  return (
    <div className="posts-container">
      <div className="filter-wrapper">
        {filteron && (
          <button className="reset" onClick={handleFilter}>
            Reset
          </button>
        )}
        <div className={filteron ? "sortfilterOff" : "sortfilterOn"}>
          <FormControl variant="outlined" className="sort-control">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="date" className="menuitem">
                Date
              </MenuItem>
              <MenuItem value="title" className="menuitem">
                Title
              </MenuItem>
              <MenuItem value="category" className="menuitem">
                Category
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="middlecontent">
        <div className="postcontent">{renderContent()}</div>
        <ErrorModal
          isOpen={showModal}
          toggle={() => setShowModal(!showModal)}
          title={modalContent.title}
          body={modalContent.body}
        />
      </div>
    </div>
  );
}

export default Posts;
