import React from "react";

import { Box, useMediaQuery } from "@mui/material";
// import NavBar from "@/scenes/NavBar";
// import UserWidget from "@/scenes/widgets/UserWidget";
import CreatePostWidget from "../widgets/CreatePostWidget";
import Navbar from "../components/Navbar";
import Posts from "../widgets/Post";
// import PostsWidget from "../widgets/PostsWidget";
// import { useSelector } from "react-redux";
// import FriendsListWidget from "../widgets/FriendsListWidget";

export default function Memories() {
  return (
    <>
      {/* <Navbar headerDash={true} /> */}
      <div className="flex flex-col items-center bg-slate-200  space-y-4">
        {/* <CreatePostWidget profilePath={"/f"} /> */}
        <Posts />
      </div>
    </>
  );
}
