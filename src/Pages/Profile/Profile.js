import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
//import UpdatePassword from "../../components/UpdateProfile/UpdatePassword";
import PricavyPolicy from "../../components/UpdateProfile/PricavyPolicy";
import UpdateAboutMe from "../../components/UpdateProfile/UpdateAboutMe";
import Typography from "@mui/material/Typography";
import { ProviderUser } from "../../context/UserDetails";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Profile.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="tab-panel"
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const orientation = isSmallScreen ? "horizontal" : "vertical";
  return (
    <Box className="tab-container">
      <Tabs
        orientation={orientation}
        onChange={handleChange}
        value={value}
        className="vertical-tabs"
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons={isSmallScreen ? "auto" : false}
        allowScrollButtonsMobile
        sx={{
          "& .MuiTab-root": {
            color: "black", // Default color
          },
          "& .Mui-selected": {
            color: "teal", // Active color
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "black", // Active indicator color
          },
        }}
      >
        <Tab label="Update Profile" />
        <Tab label="Update About Me" />
        {/*  <Tab label="Change Password" /> */}
        <Tab label="Privacy Policy" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProviderUser>
          <UpdateProfile />
        </ProviderUser>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProviderUser>
          <UpdateAboutMe />
        </ProviderUser>
      </TabPanel>
      {/*
      <TabPanel value={value} index={2}>
        <ProviderUser>
          <UpdatePassword />
        </ProviderUser>
      </TabPanel> */}
      <TabPanel value={value} index={2}>
        <ProviderUser>
          <PricavyPolicy />
        </ProviderUser>
      </TabPanel>
    </Box>
  );
}
