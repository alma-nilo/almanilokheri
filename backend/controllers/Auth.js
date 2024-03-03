import {
  TempUser,
  User,
  DeviceRecordModel,
  DailyDeviceRecordModel,
} from "../DB/user.js";
import bcrypt from "bcrypt";
import { validate as uuidValidate } from "uuid";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy"
import qrCode from "qrcode"
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
  const { mail } = req.query

  // const user = await TempUser.findOne({ email: mail });

  const secret = speakeasy.generateSecret({ length: 20, name: `Alma Nilokheri: ${mail}` });
  qrCode.toDataURL(secret.otpauth_url, async (err, dataUrl) => {
    if (err) {
      res.status(500).json({ message: 'Error generating QR code' });
    } else {
      res.status(200).json({ secret: secret.base32, qrCode: dataUrl });
    }
  });
}

export const validate = async (req, res) => {
  const { totp, email, secret } = req.body

  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: totp
  });
  if (verified) {

    const newUser = new TempUser({
      email: email,
      uuid: secret,
    });

    try {
      await newUser.save();
      res.status(200).json({ message: 'Sign Up successful' })


    } catch (error) {
      res.status(500).json({ message: 'Error saving user' });
    }
  } else {
    res.status(401).json({ message: 'Invalid token' });
  }

}

export const login = async (req, res) => {
  try {

    const { email, totp } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.uuid,
      encoding: 'base32',
      token: totp
    });

    if (verified) {

      const playload = {
        _id: user._id,
        name: user.name,
        avtar: user.profile,
        User: true,
        exp: Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60,
      };

      const token = jwt.sign(playload, process.env.PrivetKey);
      // console.log(token, Puser);
      res.status(200).json({
        code: 1,
        Token: token,
        uuid: user._id,
        profile: user.profile,
      });

    }
    else {
      res.status(404).json({ message: "user not found" });

    }




  } catch (error) {
    res.status(500).json(error);

  }

};


export const flagForAuth = async (req, res) => {

  const { mail } = req.body


  try {

    const tempUser = await TempUser.findOne({ email: mail });
    const user = await User.findOne({ email: mail });


    if (user && !tempUser && user.status) {
      res.status(200).json({ status: "LOGIN", user: user })
    }
    else if (user && !tempUser && !user.status) {
      res.status(200).json({ status: "BLOCK" })
    }
    else if (!user && tempUser && tempUser.status) {
      res.status(200).json({ status: "WAIT" })
    }
    else if (!user && tempUser && !tempUser.status) {
      res.status(200).json({ status: "REGISTRATION", tempUser: tempUser })
    }
    else if (!user && !tempUser) {
      res.status(200).json({ status: "TOTP" })
    }
    else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);

  }

}
// export const signup = async (req, res) => {
//   const { uuid, email } = req.body;

//   // //console.log(uuid, email);

//   if (!uuid || !email) {
//     res.status(404).json({ msg: "fields required " });
//     return;
//   }

//   const Tuser = await TempUser.findOne({ uuid: uuid });
//   const Puser = await User.findOne({ uuid: uuid });

//   if (Tuser) {
//     if (Tuser.status) {
//       res
//         .status(200)
//         .json({ code: 3, msg: `user  ${Tuser.status}`, uuid: Tuser.uuid });
//       return;
//     } else {
//       res
//         .status(200)
//         .json({ code: 0, msg: `user  ${Tuser.status} `, uuid: Tuser.uuid });
//       return;
//     }
//   }

//   if (Puser) {
//     if (Puser.status) {
//       const playload = {
//         _id: Puser._id,
//         name: Puser.name,
//         avtar: Puser.profile,
//         User: true,
//         exp: Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60,
//       };

//       const token = jwt.sign(playload, process.env.PrivetKey);
//       // console.log(token, Puser);
//       res.status(200).json({
//         code: 1,
//         msg: `user  ${Puser.status}`,
//         Token: token,
//         uuid: Puser._id,
//         profile: Puser.profile,
//       });
//       return;
//     } else {
//       res.status(200).json({ code: 2, msg: `user Blocked` });
//       return;
//     }
//   }

//   const input = new TempUser({ uuid, email });

//   try {
//     await input.save();
//     res.status(200).json({ code: 0, msg: "signup", uuid: uuid });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };




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

export const tempuserdocs = async (req, res) => {
  const { data, profile, profileKey, proof, proofKey } = req.body;
  try {

    if (profile && profileKey) {
      console.log("first")
      await TempUser.findOneAndUpdate({ _id: data._id }, { profile: profile, profilepath: profileKey })
      res.status(200).json({ data: "success" });
    } else if (proof && proofKey) {
      await TempUser.findOneAndUpdate({ _id: data._id }, { proof: proof, proofpath: proofKey })
      res.status(200).json({ data: "success" });


    } else {
      res.status(400).json({ err: "Somthing went wrong" });
    }

  } catch (error) {
    console.log(error)

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
