import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./request.css";

export default function Request({ Toggle, user, profile }) {
  const [userdata, setuserdata] = useState({ name: "vishal" });
  const navigate = useNavigate();

  const handleClick = () => {
    user(profile);
    Toggle(true);
  };

  return (
    <div className={`conversation_box active_chat`} onClick={handleClick}>
      <div className="conversation_logo">
        <img src={profile.profile} alt="" className="object-cover" />
      </div>
      <div>
        <h2>{profile.name}</h2>
        <h3>{profile.rollNo}</h3>
      </div>
    </div>
  );
}
