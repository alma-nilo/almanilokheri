import React, { Suspense, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { logEvent } from "firebase/analytics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./app.css";

import { AlertApi } from "./context/AlertContext";
import Loader from "./components/Loader";
import AdminProtected from "./auth/admin/AdminProtectedRoute";
import AdminUnProtected from "./auth/admin/AdminUnprotectedRoute";
import UserProtected from "./auth/admin/UserProtectedRoute.js";
import UserUnProtected from "./auth/admin/UserUnprotected.js";

import axios from "axios";
import Cookies from "js-cookie";
import UserProfile from "./pages/UserProfile.jsx";

const ChangePwd = React.lazy(() => import("./admin/pages/ChangePwd"));
const Memories = React.lazy(() => import("./pages/Memories.jsx"));
const Album = React.lazy(() => import("./pages/Album.jsx"));
const Facility = React.lazy(() => import("./pages/services/Facility.jsx"));
const IDCardPage = React.lazy(() => import("./pages/services/Icard.jsx"));
const DonationPage = React.lazy(() => import("./pages/services/Donation.jsx"));
const Suggestion = React.lazy(() => import("./pages/services/Suggestion.jsx"));
const InviteFriendPage = React.lazy(() =>
  import("./pages/services/Invite.jsx")
);
const Volunteer = React.lazy(() => import("./pages/services/Volunteer.jsx"));
const JobOpportunitiesPage = React.lazy(() =>
  import("./pages/services/Job.jsx")
);
const Stories = React.lazy(() => import("./pages/services/Stories.jsx"));
const Visits = React.lazy(() => import("./pages/services/Visits.jsx"));
const AlumniDay = React.lazy(() => import("./pages/services/AlumniDay.jsx"));

// import trackPathForAnalytics from "./auth/TrackPageForAnalytics";
// import { analytics } from "./auth/firebase";

const Alumni = React.lazy(() => import("./pages/Alumni.jsx"));
const AdminPanal = React.lazy(() => import("./admin/pages/AdminPanal.jsx"));
const MonthsRecord = React.lazy(() => import("./admin/pages/MonthsRecord.jsx"));
const DashHome = React.lazy(() => import("./admin/pages/DashHome.jsx"));
const DashRequest = React.lazy(() => import("./admin/pages/DashRequest.jsx"));
const PendingRef = React.lazy(() => import("./admin/pages/PendingRef.jsx"));
const DashAlluser = React.lazy(() => import("./admin/pages/DashAllAlumni.jsx"));
const DashNewAdmin = React.lazy(() => import("./admin/pages/DashNewAdmin.jsx"));
const AdminGallery = React.lazy(() => import("./admin/pages/Gallery.jsx"));
const TempProfileForm = React.lazy(() => import("./pages/TempProfileForm"));
const Response = React.lazy(() => import("./admin/pages/ResponseTempUser"));
const UserDetail = React.lazy(() => import("./admin/pages/UserDetail"));
const AdminNews = React.lazy(() => import("./admin/pages/News.jsx"));
const AdminEvents = React.lazy(() => import("./admin/pages/Events"));
const InstituteRecord = React.lazy(() =>
  import("./admin/pages/InstituteRecord")
);

const Home = React.lazy(() => import("./pages/Home"));
const Error = React.lazy(() => import("./pages/Error/Error"));
const Member = React.lazy(() => import("./pages/Member"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
// const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const News = React.lazy(() => import("./pages/News"));

const EventDetails = React.lazy(() => import("./components/EventsDetail"));
const MeetTheDeveloper = React.lazy(() => import("./admin/global/Devloper"));
const AdminLoginPage = React.lazy(() =>
  import("./admin/pages/AdminLoginPage.jsx")
);

function App() {
  const [deviceCount, setDeviceCount] = useState(0);

  const InsertDayRecord = async (uuid) => {
    let DeviceId = Cookies.get("DeviceId");

    if (!DeviceId) {
      const uuid = uuidv4();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Set it to midnight (12:00 AM) tonight
      // Set the cookie using js-cookie with the expiration time
      Cookies.set("DeviceId", uuid, { expires: midnight });

      let url = `${process.env.REACT_APP_API_KEY}/deviceDailyRecord`;
      const playload = { DeviceId: uuid };
      await axios.post(url, playload);
    }
  };

  const InsertDeviceRecord = async () => {
    let DeviceId = localStorage.getItem("DeviceId");

    if (!DeviceId) {
      const uuid = uuidv4();
      localStorage.setItem("DeviceId", uuid);
      const playload = { DeviceId: uuid };
      let url = `${process.env.REACT_APP_API_KEY}/deviceRecord`;
      await axios.post(url, playload);
    }
  };

  const FetchDeviceRecord = async () => {
    let url = `${process.env.REACT_APP_API_KEY}/deviceRecord`;
    try {
      const res = await axios.get(url);
      setDeviceCount(res.data.data.count);
    } catch (error) {}
  };

  const { loder } = AlertApi();

  // const

  // const location = window.location;

  useEffect(() => {
    InsertDayRecord();
    InsertDeviceRecord();
    FetchDeviceRecord();
    // logEvent(analytics, "screen_view", {
    //   firebase_screen: location.pathname, // <- In my case I do not want to include search params, so 'location.pathname' is just what I want
    //   firebase_screen_class: "firebase-routes-analytics", // <- This name is up to you
    // });
  }, []);

  return (
    <>
      {loder ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Router basename={process.env.PUBLIC_URL}>
            <div>
              <Routes>
                <Route path="/" element={<Home deviceCount={deviceCount} />} />
                <Route path="/member" element={<Member />} />
                <Route path="/gallery" element={<Gallery />}>
                  <Route path="" element={<Album />} />
                  <Route path="memories" element={<Memories />} />
                </Route>

                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contactUs" element={<ContactUs />} />

                {/* serice */}
                <Route
                  path="/service/facility"
                  element={
                    <UserProtected>
                      <Facility />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/idcard"
                  element={
                    <UserProtected>
                      <IDCardPage />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/donation"
                  element={
                    <UserProtected>
                      <DonationPage />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/suggestion"
                  element={
                    <UserProtected>
                      <Suggestion />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/invite"
                  element={
                    <UserProtected>
                      <InviteFriendPage />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/volunteer"
                  element={
                    <UserProtected>
                      <Volunteer />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/job"
                  element={
                    <UserProtected>
                      <JobOpportunitiesPage />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/alumni"
                  element={
                    <UserProtected>
                      <AlumniDay />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/visit"
                  element={
                    <UserProtected>
                      <Visits />
                    </UserProtected>
                  }
                />
                <Route
                  path="/service/stories"
                  element={
                    <UserProtected>
                      <Stories />
                    </UserProtected>
                  }
                />
                <Route path="/*" element={<Error />} />
                {/* <Route path="/login" element={<Login />} /> */}

                <Route
                  path="/signup"
                  element={
                    <UserUnProtected>
                      <SignUp />
                    </UserUnProtected>
                  }
                />
                <Route
                  path="/signup/:id"
                  element={
                    <UserUnProtected>
                      <TempProfileForm />
                    </UserUnProtected>
                  }
                />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/news" element={<News />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/devloper" element={<MeetTheDeveloper />} />
                <Route
                  path="/alumni"
                  element={
                    <UserProtected>
                      <Alumni />{" "}
                    </UserProtected>
                  }
                />

                {/* Admin */}

                <Route
                  path="/adminlogin"
                  element={
                    <AdminUnProtected>
                      {" "}
                      <AdminLoginPage />
                    </AdminUnProtected>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <AdminProtected>
                      {" "}
                      <AdminPanal />
                    </AdminProtected>
                  }
                >
                  <Route
                    path=""
                    element={
                      <AdminProtected>
                        {" "}
                        <DashHome deviceCount={deviceCount} />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="req"
                    element={
                      <AdminProtected>
                        {" "}
                        <DashRequest />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="pendingRef"
                    element={
                      <AdminProtected>
                        {" "}
                        <PendingRef />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="user"
                    element={
                      <AdminProtected>
                        {" "}
                        <DashAlluser />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <AdminProtected>
                        {" "}
                        <DashNewAdmin />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="gallery"
                    element={
                      <AdminProtected>
                        {" "}
                        <AdminGallery />
                      </AdminProtected>
                    }
                  />

                  <Route
                    path="tempuser/:id"
                    element={
                      <AdminProtected>
                        {" "}
                        <Response />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="user/:id"
                    element={
                      <AdminProtected>
                        <UserDetail />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="news"
                    element={
                      <AdminProtected>
                        {" "}
                        <AdminNews />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="events"
                    element={
                      <AdminProtected>
                        {" "}
                        <AdminEvents />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="Record"
                    element={
                      <AdminProtected>
                        {" "}
                        <InstituteRecord />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="monthsRecord/:month/:year"
                    element={
                      <AdminProtected>
                        {" "}
                        <MonthsRecord />
                      </AdminProtected>
                    }
                  />
                  <Route
                    path="pwd"
                    element={
                      <AdminProtected>
                        {" "}
                        <ChangePwd />
                      </AdminProtected>
                    }
                  />
                </Route>

                {/* Admin */}
              </Routes>
            </div>
          </Router>
        </Suspense>
      )}
    </>
  );
}

export default App;
