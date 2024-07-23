import {
  Adminlogin,
  getTempUser,
  UserResponse,
  fetchhomeuser,
  fetch,
  getoneuser,
  NewAdmin,
  uploadDocument,
  fetchGallery,
  AllfetchGallery,
  deleteGallerypic,
  editpictureTitle,
  getAllUser,
  getSingleUser,
  createNews,
  getNews,
  getHomeNews,
  deleteNews,
  editNews,
  createEvents,
  getEvents,
  deleteEvents,
  editEvents,
  getEventsOne,
  handlestatus,
  getInstituteCollection,
  handleInstituteCollection,
  ContactUs,
  ContactUsCount,
  ContactUsGet,
  ContactUsDelete,
  ContactUsRead,
  DashBoard,
  UserReqCount,
  monthsTrafficData,
  OneMonthTrafficData,
  changePwd,
  CreatePost,
  AllPost,
  deletePost,
  responsereferrer,
  pendingUserData,
  sendEmailToPending,
  referencePending,
} from "../controllers/admin.js";
import { Router } from "express";
import { AdminAuth } from "../middleware/admin.js";
import multer from "multer"; // Import multer

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2mb
});
const router = Router();

router.post(
  "/uploadDocument",
  AdminAuth,

  uploadDocument
);

router.post("/", Adminlogin);
router.post("/new", AdminAuth, NewAdmin);
router.get("/user", AdminAuth, getTempUser);
router.get("/user/:id", AdminAuth, getSingleUser);
router.post("/changePwd", AdminAuth, changePwd);
router.get("/alluser", AdminAuth, getAllUser);
///** get pending User */
router.get("/pendingUser", AdminAuth, pendingUserData);
//**get pending refrence */
router.get("/pendingRef", AdminAuth, referencePending);
router.post("/sendEmail", AdminAuth, sendEmailToPending);
router.get("/fetchhomeuser", fetchhomeuser);
router.get("/fetch", fetch);
router.get("/getuser/:id", getoneuser);
router.post("/response", AdminAuth, UserResponse);

router.get("/gallery", fetchGallery);
router.get("/allgallery", AllfetchGallery);
router.get("/deletepicture", AdminAuth, deleteGallerypic);
router.post("/editpicturetitle", AdminAuth, editpictureTitle);

// news
router.post("/news", AdminAuth, createNews);
router.get("/news", getNews);
router.post("/news/delete", AdminAuth, deleteNews);
router.post("/news/edit", AdminAuth, editNews);
router.get("/news/home", getHomeNews);

// Events
router.post("/event", AdminAuth, createEvents);
router.get("/event", getEvents);
router.get("/event/:id", getEventsOne);
router.post("/event/delete", AdminAuth, deleteEvents);
router.post("/event/edit", AdminAuth, editEvents);

// handlestatus
router.post("/handlestatus", AdminAuth, handlestatus);

//  previous record
router.post(
  "/insertInstituteCollection",
  AdminAuth,
  upload.single("institute"),
  handleInstituteCollection
);

router.get("/getInstituteCollection", getInstituteCollection);

//  contact us

router.post("/contactUs", ContactUs);
router.post("/ContactUsDelete", ContactUsDelete);
router.get("/contactUs", AdminAuth, ContactUsGet);
router.get("/contactUsCount", ContactUsCount);
router.post("/contactUsCount", ContactUsRead);

// Dashboard
router.get("/Dashboard", AdminAuth, DashBoard);
router.get("/UserReqCount", UserReqCount);

router.get("/monthsTrafficData", AdminAuth, monthsTrafficData);
router.get("/OneMonthTrafficData", AdminAuth, OneMonthTrafficData);

router.post("/post", AdminAuth, CreatePost);
router.get("/post", AllPost);
router.post("/post/delete", AdminAuth, deletePost);

router.get("/responsereferrer", responsereferrer);

export default router;
