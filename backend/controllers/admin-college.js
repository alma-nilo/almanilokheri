import { User } from "../DB/user.js";
import { v4 as uuid } from "uuid";

export const addNewUsers = async (req, res) => {
  const { data } = req.body;
  let addedUser = 0;
  let updatedUser = 0;
  console.log("Adding users");
  //   console.log(Array.isArray(data));
  //   return res.status(200).json({ message: "done" });
  for (let d of data) {
    const {
      email,
      name,
      rollNo,
      Trade,
      isManual,
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
      !isManual ||
      !mobile ||
      !profile ||
      !status ||
      !startYear ||
      !endYear
    ) {
      return res.status(400).json({
        error: true,
        message:
          "please provide correct data And check all details name must be ( email name  rollNo  Trade  isManual  mobile  profile  status  startYear  endYear)",
      });
    }

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
          isManual,
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
        isManual,
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
  return res.status(201).json({
    message: "Users Added successfully",
    code: 1,
    addedUser,
    updatedUser,
  });
};
