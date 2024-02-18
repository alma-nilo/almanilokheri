import React, { useEffect, useState } from "react";
import EventsUploadFrom from "../components/EventsUploadFrom";

import EventView from "../components/EventView";
import { AuthApi } from "../../context/user";
import axios from "axios";

const Events = () => {
  const [eventList, seteventList] = useState([]);
  const { admin } = AuthApi();

  const fetchEvent = async () => {
    // Handle the form submission here

    const url = `${process.env.REACT_APP_API_KEY}/admins/event`;

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };
    try {
      const res = await axios.get(url, config);

      seteventList(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchEvent();
  }, [admin]);

  return (
    <div className={`min-h-screen  `}>
      <div className="container mx-auto p-8">
        <h1 className={` text-3xl text-gray-400 font-bold mb-4`}>
          Events Upload
        </h1>
        <EventsUploadFrom fetchEvent={fetchEvent} />
      </div>
      <EventView eventList={eventList} fetchEvent={fetchEvent} />
    </div>
  );
};

export default Events;
