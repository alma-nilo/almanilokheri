import { Router } from "express";
import {
  login,
  signup,
  getTempvalidation,
  tempuser,
  insertDeviceRecord,
  getDeviceRecord,
  insertdeviceDailyRecord,
  tempuserdocs,
  validate,
  flagForAuth
} from "../controllers/Auth.js";
const router = Router();

router.post("/signup", signup);
router.post("/validate", validate);
router.post("/flagforauth", flagForAuth);
router.post("/signup/:id", getTempvalidation);
router.post(
  "/tempuserinfo",
  tempuser
);
router.post(
  "/tempuserdocs",
  tempuserdocs
);
router.post("/login", login);

router.post("/deviceRecord", insertDeviceRecord);
router.get("/deviceRecord", getDeviceRecord);
router.post("/deviceDailyRecord", insertdeviceDailyRecord);

export default router;
