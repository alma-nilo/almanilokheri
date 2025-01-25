import { User } from "../DB/user.js";
import { v4 as uuid } from "uuid";

export const addNewUsers = async (req, res) => {
  const { users: data } = req.body;
  // console.log(Array.isArray(data));
  let skippedUser = [];

  const transformedData = data.filter((d) => {
    const {
      email,
      name,
      rollNo,
      Trade,
      // isManual,
      mobile,
      profile,
      status,
      startYear,
      endYear,
    } = d;
    if (
      !email ||
      !name ||
      !rollNo ||
      !Trade ||
      // !isManual ||
      !mobile ||
      !profile ||
      !status ||
      !startYear ||
      !endYear
    ) {
      skippedUser.push(d);
      return false;
    } else {
      return true;
    }
  });
  let addedUser = 0;
  let updatedUser = 0;
  console.log("Adding users");
  // console.log(Array.isArray(data));
  // return res.status(200).json({ message: "done" });
  for (let d of transformedData) {
    const {
      email,
      name,
      rollNo,
      Trade,
      // isManual,
      mobile,
      profile,
      status,
      startYear,
      endYear,
    } = d;
    const isUserExits = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (isUserExits) {
      //update user for addition of new  fields
      // console.log(email.toLowerCase());
      const user = await User.updateOne(
        { email: { $regex: new RegExp(`^${email}$`, "i") } },
        {
          name,
          rollNo,
          Trade,
          isManual: true,
          mobile,
          profile,
          status,
          startYear,
          endYear,
        }
      );
      updatedUser++;
    } else {
      const id = uuid();
      const user = await User.create({
        uuid: id,
        email: email.toLowerCase(),
        name,
        rollNo,
        Trade,
        isManual: true,
        mobile,
        profile,
        status,
        startYear,
        endYear,
      });
      addedUser++;
      await user.save();
    }
  }
  res.status(201).json({
    message: "Users Added successfully",
    code: 1,
    addedUser,
    updatedUser,
    skippedUser,
  });
};

export const getManualNewUsers = async (req, res) => {
  try {
    const data = await User.find({ isManual: true }).select("-password"); // Exclude sensitive fields

    if (!data.length) {
      return res.status(400).json({
        success: false,
        message: "No manual users found.",
      });
    }
    let object = data.map(({ uuid, name, email, rollNo, status }, i) => {
      let obj = {
        id: i + 1,
        name: name,
        email: email,
        rollNo: rollNo,
        status: status,
        view: uuid,
      };
      return obj;
    });

    res.status(200).json({
      success: true,
      message: "Manual users retrieved successfully.",
      data: object,
    });
  } catch (error) {
    console.error("Error fetching manual users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
