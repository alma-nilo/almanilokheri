import { User } from "../DB/user.js";
import { v4 as uuid } from "uuid";
import xlsx from "xlsx";

export const addNewUsers = async (req, res) => {
  // const { data } = req.body;
  const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
  for (let sheetVal of workbook.SheetNames) {
    const sheetName = sheetVal;
    const sheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json(sheet);
    console.log({ rawData });
    let CheckInvalid;
    rawData.slice(0, 1).map((entry) => {
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
      } = entry;
      if (
        !email ||
        !name ||
        !rollNo ||
        !Trade ||
        // !isManual ||  // isManual check can be avoided
        !mobile ||
        !profile ||
        !status ||
        !startYear ||
        !endYear
      ) {
        return (CheckInvalid = false);
      } else {
        return (CheckInvalid = true);
      }
    });

    if (!CheckInvalid) {
      res.status(400).json({
        message: `Invalid XLXS columns ( correct Them ),   {email  name rollNo Trade mobile profile status startYear endYear}`,
      });
      return;
    }

    const transformedData = rawData.map((entry, i) => ({
      email: entry.email,
      name: entry.name,
      rollNo: entry.rollNo,
      Trade: entry.Trade,
      // isManual: entry.isManual,
      mobile: entry.mobile,
      profile: entry.profile,
      status: entry.status,
      startYear: entry.startYear,
      endYear: entry.endYear,
    }));

    let addedUser = 0;
    let updatedUser = 0;
    console.log("Adding users");
    //   console.log(Array.isArray(data));
    //   return res.status(200).json({ message: "done" });
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
      } = transformedData;
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
        return res.status(400).json({
          error: true,
          message:
            "please provide correct data And check all details name must be ( email name  rollNo  Trade   mobile  profile  status  startYear  endYear)",
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
  }
  return res.status(201).json({
    message: "Users Added successfully",
    code: 1,
    addedUser,
    updatedUser,
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
