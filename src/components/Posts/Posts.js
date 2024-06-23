import React, { useContext, useState, useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import BlogContext from "../../context/BlogPost";
import ErrorModal from "../ErrorModal/ErrorModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import animationdata from "../../assets/Animation.json";
import Lottie from "react-lottie-player";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function Posts() {
  const { data, filteron, handleFilter, handleBlogs } = useContext(BlogContext);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Adjust this value as needed
  const isLoading = data.length === 0 && !loadingTimeout;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000); // Adjust timeout as needed
    handleBlogs();
    return () => clearTimeout(timer);
  }, [handleBlogs]);

  useEffect(() => {
    if (data.length === 0) {
      if (filteron) {
        setShowModal(true);
        setModalContent({
          title: "No Posts in Selected Category",
          body: "No posts available for this category.",
        });
      }
    }
  }, [data, loadingTimeout, filteron]);

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
    return null; // This will never show because modal or no posts message will be displayed
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="posts-container">
      <div className="filter-wrapper">
        {filteron && (
          <div>
            <button className="reset" onClick={handleFilter}>
              Reset
            </button>
            <div className="sortfilterOff">
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
        )}
        {!filteron && (
          <div className="sortfilterOn">
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
        )}
      </div>
      <div className="middlecontent">
        <div className="postcontent">
          <div className={filteron ? "postsfilter" : "posts"}>
            {isLoading ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              renderPosts()
            )}
          </div>
          <ErrorModal
            isOpen={showModal}
            toggle={() => setShowModal(!showModal)}
            title={modalContent.title}
            body={modalContent.body}
          />
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
      </div>
    </div>
  );
}

export default Posts;
