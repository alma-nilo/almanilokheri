import mongoose from "mongoose";

const { Schema } = mongoose;

// admin AdminSchema
const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  flag: {
    type: Boolean,
  },
});
// Define the user schema
const UserSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  rollNo: {
    type: String,
  },
  aadhaar: {
    type: String,
  },
  referral: {
    type: Schema.Types.ObjectId,
  },
  Trade: {
    type: String,
  },
  startYear: {
    type: String,
  },
  endYear: {
    type: String,
  },

  profession: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  profile: {
    type: String,
  },
  proof: {
    type: String,
  },
  isproof: {
    type: Boolean,
    default: false,
  },
  profilepath: {
    type: String,
  },
  proofpath: {
    type: String,
  },
  linkdln: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  about: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "Pending",
  },
});
const GallerySchema = new Schema({
  Document: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Path: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  newFlag: {
    type: Boolean,
    default: true,
  },
});
const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const InstituteCollection = new Schema({
  branch: {
    type: String,
  },
  rollNo: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  fatherName: {
    type: String,
  },
});

const ContactUs = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  unread: {
    type: Boolean,
    default: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const DeviceRecord = new Schema({
  count: {
    type: String,
  },
});

const DailyDeviceRecord = new Schema({
  day: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  count: {
    type: String,
  },
});

const Post = new Schema({
  user: Schema.Types.ObjectId,
  content: {
    type: String,
  },
  name: {
    type: String,
  },
  avtar: {
    type: String,
  },
  image: {
    type: String,
  },
  path: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

// Create the user model
export const User = mongoose.model("User", UserSchema);
export const Admin = mongoose.model("admin", AdminSchema);
export const Gallery = mongoose.model("Gallery", GallerySchema);
export const NewsModel = mongoose.model("news", NewsSchema);
export const EventModel = mongoose.model("Events", EventSchema);
export const ContactUsModel = mongoose.model("ContactUs", ContactUs);
export const DeviceRecordModel = mongoose.model("DeviceRecord", DeviceRecord);
export const PostModel = mongoose.model("Post", Post);
export const DailyDeviceRecordModel = mongoose.model(
  "DailyDeviceRecord",
  DailyDeviceRecord
);
export const InstituteModel = mongoose.model(
  "InstituteCollection",
  InstituteCollection
);
