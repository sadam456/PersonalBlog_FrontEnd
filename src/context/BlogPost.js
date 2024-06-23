import { createContext, useCallback, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
const BlogContext = createContext();
function ProviderBlog({ children }) {
  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [filteron, setFilterOn] = useState(false);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const { currentUser } = useAuth();

  const loadBlogs = useCallback(async () => {
    if (!currentUser) {
      console.error("No current user, cannot load blogs");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/blog/user/${currentUser.uid}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [currentUser]);

  const handleFilter = () => {
    setData(alldata);
    setFilterOn(false);
  };

  const handleBlogs = useCallback(async () => {
    if (currentUser) {
      const blogs = await loadBlogs();
      setAllData(blogs);
      setData(blogs);
      setFavoritePosts(blogs.filter((blog) => blog.favorite));
      setFilterOn(false);
    }
  }, [currentUser, loadBlogs]);

  useEffect(() => {
    handleBlogs();
  }, [handleBlogs]);

  const handlePostsByCategory = async (category) => {
    const responce = await axios.get(
      `http://localhost:8080/blog/category/${category}`,
      {
        params: {
          userId: currentUser.uid,
        },
      }
    );
    setData(responce.data);
    setFilterOn(true);
  };

  const addFavoritePost = async (post) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/blog/favorite",
        null,
        {
          params: {
            userId: currentUser.uid,
            postId: post.id,
            favorite: true,
          },
        }
      );
      console.log(response.data);
      setFavoritePosts((prevFavorites) => [...prevFavorites, post]);
    } catch (error) {
      console.error("Error adding favorite post:", error);
    }
  };

  const removeFavoritePosts = async (postId) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/blog/favorite",
        null,
        {
          params: {
            userId: currentUser.uid,
            postId: postId,
            favorite: false,
          },
        }
      );
      console.log(response.data);
      setFavoritePosts((prevFavorites) =>
        prevFavorites.filter((post) => post.id !== postId)
      );
    } catch (error) {
      console.error("Error removing favorite post:", error);
    }
  };

  const valueToShare = {
    data,
    filteron,
    favoritePosts,
    removeFavoritePosts,
    addFavoritePost,
    handleFilter,
    handleBlogs,
    handlePostsByCategory,
  };
  return (
    <BlogContext.Provider value={valueToShare}>{children}</BlogContext.Provider>
  );
}

export { ProviderBlog };
export default BlogContext;
