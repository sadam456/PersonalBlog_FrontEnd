import "./App.css";
import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import About from "./Pages/About/About";
import Contact from "./components/Contact/Contact";
import Home from "./Pages/Home/Home";
import SinglePost from "./Pages/SinglePost/SinglePost";
import Write from "./Pages/Write/Write";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Edit from "./Pages/Edit/Edit";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import BlogContext from "./context/BlogPost";
import { ProviderUser } from "./context/UserDetails";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
function App() {
  const { handleBlogs } = useContext(BlogContext);

  useEffect(() => {
    handleBlogs();
  }, [handleBlogs]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route
            path="/about"
            element={
              <ProviderUser>
                <About />
              </ProviderUser>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={ <ProviderUser><SinglePost /></ProviderUser> } />
          <Route path="/create" element={<Write />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProviderUser>
                  <Profile />
                </ProviderUser>
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
