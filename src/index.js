import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProviderBlog } from "./context/BlogPost";
import { Provider } from "./context/WritePost";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ProviderBlog>
        <Provider>
          <App />
        </Provider>
      </ProviderBlog>
    </AuthProvider>
  </BrowserRouter>
);
