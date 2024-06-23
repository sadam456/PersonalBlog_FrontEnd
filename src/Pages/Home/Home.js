import { React } from "react";
import Content from "../../components/Content/Content";
import Sidebar from "../../components/Sidebar/Sidebar";
import Posts from "../../components/Posts/Posts";
import { ProviderUser } from "../../context/UserDetails";
import "./Home.css";

function Home() {
  return (
    <>
      <ProviderUser>
        <Content />
      </ProviderUser>
      <div className="home">
        <Posts />
        <ProviderUser>
          <Sidebar />
        </ProviderUser>
      </div>
    </>
  );
}

export default Home;
