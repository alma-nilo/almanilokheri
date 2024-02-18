import { Router } from "express";
import {
  login,
  signup,
  otpsent,
  validate,
  getTempvalidation,
  tempuser,
  insertDeviceRecord,
  getDeviceRecord,
  insertdeviceDailyRecord,
} from "../controllers/Auth.js";
const router = Router();

router.post("/signup", signup);
router.post("/signup/:id", getTempvalidation);
router.post(
  "/tempuserinfo",
  tempuser
);
router.post("/login", login);
router.post("/otpsent", otpsent);
router.post("/validate", validate);
router.post("/deviceRecord", insertDeviceRecord);
router.get("/deviceRecord", getDeviceRecord);
router.post("/deviceDailyRecord", insertdeviceDailyRecord);

export default router;
