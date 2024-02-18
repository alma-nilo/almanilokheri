import {
  TempUser,
  User,
  DeviceRecordModel,
  DailyDeviceRecordModel,
} from "../DB/user.js";
import bcrypt from "bcrypt";
import { validate as uuidValidate } from "uuid";
import jwt from "jsonwebtoken";
import { sentotp } from "../mail/server.js";
import { uploadImageToStorage } from "../firebase/firestore/functions.js";
import dotenv from "dotenv";
dotenv.config();

export const tempuser = async (req, res) => {
  // Extract user input
  const {
    uuid,
    name,
    rollNo,
    Trade,
    profession,
    linkdln,
    facebook,
    twitter,
    about,
    startYear,
    endYear,
    state,
    district,
    proof,
    proofKey
  } = req.body;

  if (
    !name ||
    !rollNo ||
    !profession ||
    !about ||
    !startYear ||
    !endYear ||
    !Trade
  ) {
    res.status(404).json({ msg: "invalid signature " });
  }


  try {

    const operation = {
      name: name,
      rollNo: rollNo,
      startYear: startYear,
      endYear: endYear,
      profession: profession,
      proof: proof,
      proofpath: proofKey,
      linkdln: linkdln,
      facebook: facebook,
      twitter: twitter,
      about: about,
      Trade: Trade,
      district: district,
      state: state,
      status: true,
    };
    // console.log(district);
    // return;
    await TempUser.findOneAndUpdate({ uuid: uuid }, operation);

    res.status(200).json({ message: "wait for institute approvel" });
    return;
  } catch (error) {
    res.status(500).json({ err: error });
    return;
  }
};

export const signup = async (req, res) => {
  const { uuid, email, profile } = req.body;

  // //console.log(uuid, email);

  if (!uuid || !email) {
    res.status(404).json({ msg: "fields required " });
    return;
  }

  const Tuser = await TempUser.findOne({ uuid: uuid });
  const Puser = await User.findOne({ uuid: uuid });

  if (Tuser) {
    if (Tuser.status) {
      res
        .status(200)
        .json({ code: 3, msg: `user  ${Tuser.status}`, uuid: Tuser.uuid });
      return;
    } else {
      res
        .status(200)
        .json({ code: 0, msg: `user  ${Tuser.status} `, uuid: Tuser.uuid });
      return;
    }
  }

  if (Puser) {
    if (Puser.status) {
      const playload = {
        _id: Puser._id,
        name: Puser.name,
        avtar: Puser.profile,
        User: true,
        exp: Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60,
      };

      const token = jwt.sign(playload, process.env.PrivetKey);
      // console.log(token, Puser);
      res.status(200).json({
        code: 1,
        msg: `user  ${Puser.status}`,
        Token: token,
        uuid: Puser._id,
        profile: Puser.profile,
      });
      return;
    } else {
      res.status(200).json({ code: 2, msg: `user Blocked` });
      return;
    }
  }

  const input = new TempUser({ uuid, email, profile });

  try {
    await input.save();
    res.status(200).json({ code: 0, msg: "signup", uuid: uuid });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    // Extract user input
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare the password hash
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Passwords match, create and send a token
    const token = jwt.sign({ userId: user._id }, process.env.PrivetKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const otpsent = async (req, res) => {
  const { email } = req.body;
  // Generate random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  const token = jwt.sign({ email: email, otp: otp }, process.env.PrivetKey, {
    expiresIn: "300s",
  });
  sentotp(email, otp);
  res.status(200).json({ msg: "otp sent", token: token });
};

export const validate = async (req, res) => {
  const { otp, email } = req.body;
  const { token } = req.headers;

  try {
    const data = await jwt.verify(token, process.env.PrivetKey);

    if (parseInt(data.otp) === parseInt(otp) && data.email === email) {
      const token = jwt.sign(
        { email: email, validation: true },
        process.env.PrivetKey,
        {
          expiresIn: "300s",
        }
      );
      res.status(200).json({ msg: "otp match ", token: token });
    } else {
      res.status(500).json({ msg: "otp not match" });
    }
  } catch (error) {
    res.status(500).json({ msg: "otp not match" });
  }
};

export const getTempvalidation = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TempUser.findOne({ uuid: id });

    if (!data) {
      res.status(400).json({ err: "not found" });
      return;
    }
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const insertDeviceRecord = async (req, res) => {
  const { DeviceId } = req.body;
  try {
    if (uuidValidate(DeviceId)) {
      const id = process.env.PrivetKey;
      const { count } = await DeviceRecordModel.findOne({ _id: id });
      const currentRec = parseInt(count);
      await DeviceRecordModel.findByIdAndUpdate(id, { count: currentRec + 1 });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const getDeviceRecord = async (req, res) => {
  try {
    const id = process.env.PrivetKey;
    const data = await DeviceRecordModel.findOne({ _id: id });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const insertdeviceDailyRecord = async (req, res) => {
  const { DeviceId } = req.body;
  try {
    if (uuidValidate(DeviceId)) {
      const now = new Date();
      const year = now.getFullYear();
      const day = now.getDate();
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const currentMonth = months[now.getMonth()];

      const count = await DailyDeviceRecordModel.findOne({
        day: day,
        year: year,
        month: currentMonth,
      });

      if (count) {
        const currentRec = parseInt(count.count);
        await DailyDeviceRecordModel.findOneAndUpdate(
          {
            day: day,
            year: year,
            month: currentMonth,
          },
          { count: currentRec + 1 }
        );

        res.status(200).json({ count });
      } else {
        const data = new DailyDeviceRecordModel({
          day: day,
          year: year,
          month: currentMonth,
          count: "1",
        });
        await data.save();
        res.status(200).json({ msg: "first  entry of day" });
      }
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
