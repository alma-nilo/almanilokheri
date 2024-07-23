import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import { AuthApi } from "../../context/user";

const Item = ({ title, to, icon, selected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === window.location.pathname}
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
    >
      <Link to={to} />
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  //eslint
  const { admin, userReqNotification } = AuthApi();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  className="object-cover"
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={
                    "https://images.pexels.com/photos/8059110/pexels-photo-8059110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  style={{
                    cursor: "pointer",
                    borderRadius: "100px 100px",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {admin?.user}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Smart Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={"/admin"}
            />{" "}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Pending user"
              to="/admin/req"
              icon={
                <div className="user_not">
                  <PeopleOutlinedIcon />
                  {userReqNotification > 0 &&
                  window.location.pathname !== "/admin/req" ? (
                    <div className={`green-dot`}></div>
                  ) : (
                    ""
                  )}
                </div>
              }
              selected={"/admin/req"}
            />
            <Item
              title="All User"
              to="/admin/user"
              icon={<ContactsOutlinedIcon />}
              selected={"/admin/user"}
            />
            {/* //*** Pending references */}
            <Item
              title="Pending References"
              to="/admin/pendingRef"
              icon={<WorkHistoryIcon />}
              selected={"/admin/pendingRef"}
            />
            <Item
              title="Gallery"
              to="/admin/gallery"
              icon={<AddPhotoAlternateIcon />}
              selected={"/admin/gallery"}
            />
            <Item
              title="News"
              to="/admin/news"
              icon={<NewspaperIcon />}
              selected={"/admin/news"}
            />
            <Item
              title="Events"
              to="/admin/events"
              icon={<EmojiEventsIcon />}
              selected={"/admin/events"}
            />
            <Item
              title="Institute Record"
              to="/admin/Record"
              icon={<GroupsIcon />}
              selected={"/admin/Record"}
            />
            <Item
              title="Change Password"
              to="/admin/pwd"
              icon={<LockPersonIcon />}
              selected={"/admin/pwd"}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
