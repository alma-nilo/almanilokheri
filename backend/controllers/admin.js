import {
  Admin,
  User,
  Gallery,
  NewsModel,
  EventModel,
  InstituteModel,
  ContactUsModel,
  DailyDeviceRecordModel,
  PostModel,
} from "../DB/user.js";
import xlsx from "xlsx";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCEPT,
  ACTIVEMAIL,
  BLOCKEDMAIL,
  REJECT,
  PendingUser,
} from "../mail/server.js";
import { deleteImageToStorage } from "../aws/functions.js";

function getDaysInMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentYear = currentDate.getFullYear();

  // Use the Date constructor to get the last day of the current month
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0);

  // Get the day of the month from the last day of the current month
  const numberOfDays = lastDayOfMonth.getDate();

  return numberOfDays;
}

// admin login
export const Adminlogin = async (req, res) => {
  try {
    // Extract user input
    const { email, password } = req.body;

    // Check if user exists
    const user = await Admin.findOne({ username: email });

    if (!user) {
      return res.status(401).json({ error: "unauthorized" });
    }
    // Compare the password hash
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "unauthorized" });
    }

    // Passwords match, create and send a token

    const playload = {
      userId: user._id,
      admin: true,
      exp: Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60,
    };

    const token = jwt.sign(playload, process.env.PrivetKey);

    let data = {
      admin: 1,
      user: user.username,
      token: token,
    };

    res.status(200).json({ message: "Admin Login successful", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fetch temp user request
export const getTempUser = async (req, res) => {
  try {
    console.log("first");
    const data = await User.find({ isproof: true, status: "NotApprove" });

    let object = data.map(
      ({ uuid, name, email, rollNo, startYear, endYear }, i) => {
        let obj = {
          id: i + 1,
          name: name,
          email: email,
          rollNo: rollNo,
          batch: startYear + " - " + endYear,
          view: uuid,
        };
        return obj;
      }
    );

    res.status(200).json({ data: object });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// fetch temp user request
export const getAllUser = async (req, res) => {
  try {
    const data = await User.find({ status: { $ne: "Pending" } });

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

    res.status(200).json({ data: object });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//* get pending user///
export const pendingUserData = async (req, res) => {
  try {
    const data = await User.find({ status: { $eq: "Pending" } });
    // console.log(data);
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

    res.status(200).json({ data: object });
  } catch (error) {
    res.status(500).json(error);
  }
};

////**get single User */
export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findOne({ uuid: id });

    if (!data) {
      res.status(400).json({ err: "not found" });
      return;
    }
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

//  UserResponse

export const UserResponse = async (req, res) => {
  const { email, flage, remark } = req.body;

  if (!email || !flage) {
    res.status(400).json({ Err: "invalid signature " });
    return;
  }
  // //console.log(req.body);
  // ensure user exist or not
  try {
    let data = await User.findOne({ email });

    // eslint-disable-next-line
    if (!data) {
      res.status(400).json({ Err: "invalid signature " });
      return;
    }

    if (flage === "Accept") {
      console.log(flage);

      const newuser = await User.findOneAndUpdate(
        { email: email },
        { status: "Approve" }
      );

      // sent mail for accept
      ACCEPT(email, data.name);
      res.status(200).json({ msg: "user Accept " });
      return;
    } else {
      // reject
      if (data.proofpath) {
        deleteImageToStorage(data.proofpath);
      }
      if (data.profilepath) {
        deleteImageToStorage(data.profilepath);
      }

      await User.deleteOne({ email: email });
      await PostModel.deleteMany({ user: data._id });
      REJECT(email, remark, data.name);
      // sent mail for rejection
      res.status(200).json({ msg: "user rejected " });
      return;
    }

    // accept reject
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: error });
    return;
  }
};
//// *** Send email to pending users */

export const sendEmailToPending = async (req, res) => {
  const { email, flag } = req.body;

  if (!email || !flag) {
    res.status(400).json({ Err: "invalid signature " });
    return;
  }
  try {
    if (flag === "Pending") {
      console.log(flag);

      // ensure user exist or not
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(400).json({ Err: "invalid signature " });
        return;
      }
      if (user.status === "Pending") {
        // sent mail for pending user
        PendingUser(email);
        res.status(200).json({ msg: "Email has been sendto users " });
        return;
      }
    } else {
      console.log(error);
      console.log("error in Pending User email");
    }

    // accept reject
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: error });
    return;
  }
};

////***----------------------------------------- */
export const fetch = async (req, res) => {
  let page = parseInt(req.query.page) || 1;

  const perPage = parseInt(req.query.perPage) || 6;

  const query = {
    status: { $nin: ["Block", "Pending"] }, // Mandatory condition
  };

  if (req.query.searchName) {
    page = 1;
    query.$or = [
      { name: { $regex: req.query.searchName, $options: "i" } },
      { rollNo: { $regex: req.query.searchName, $options: "i" } }, // Assuming rollNumber is the field for roll number
    ];
  }

  if (req.query.searchTrade) {
    page = 1;

    query.Trade = req.query.searchTrade;
  }

  console.log(query);

  const skip = (page - 1) * perPage;

  try {
    const totalpost = await User.countDocuments(query);
    const totalPages = Math.ceil(totalpost / perPage);

    console.log("total post ", totalpost);
    console.log("perpage:", perPage);
    console.log("page:", page);
    console.log(skip);

    const data = await User.find(query)
      .sort({ _id: -1 }) // Sort in descending order based on _id (timestamp)
      .skip(skip)
      .limit(perPage);
    // console.log({ data: data, totalPages: totalPages })
    res.status(200).json({ data: data, totalPages: totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export const fetchhomeuser = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $match: { status: { $nin: ["Block", "Pending"] } } },
      { $sample: { size: 8 } },
    ]);
    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getoneuser = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await User.findOne({ _id: id });

    if (!data) {
      res.status(400).json({ err: "not found" });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const uploadDocument = async (req, res) => {
  const documents = req.body; // Assuming req.body is an array of documents

  try {
    const insertedDocuments = await Gallery.insertMany(documents);

    res.status(200).json({ msg: "upload", insertedDocuments });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const fetchGallery = async (req, res) => {
  try {
    const data = await Gallery.aggregate([{ $sample: { size: 5 } }]);

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const AllfetchGallery = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const perPage = parseInt(req.query.perPage) || 4; // You can adjust this value based on your preferences

  const admin = req.headers.admin || false;

  const skip = (page - 1) * perPage;

  try {
    const totalImages = await Gallery.countDocuments();
    const totalPages = Math.ceil(totalImages / perPage);

    // for user
    // const data = await Gallery.find().skip(skip).limit(perPage);
    const data = await Gallery.find()
      .sort({ _id: -1 }) // Sort in descending order based on _id (timestamp)
      .skip(skip)
      .limit(perPage);

    // //console.log(data);
    res.status(200).json({ data: data, totalPages: totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGallerypic = async (req, res) => {
  try {
    const { id, image } = req.query;
    //console.log(req.query);

    deleteImageToStorage(image);

    // Find the picture by its ObjectId and delete it
    const deletedPicture = await Gallery.findByIdAndDelete(id);

    if (!deletedPicture) {
      return res.status(404).json({ msg: "Picture not found." });
    }

    // Return the deleted picture data
    res.json(deletedPicture);
  } catch (error) {
    // Handle error if any
    res.status(500).json({ error: "Could not delete picture." });
  }
};

export const editpictureTitle = async (req, res) => {
  try {
    const { editTitle, id } = req.body;

    // Find the picture by its ID and update the title
    const updatedPicture = await Gallery.findByIdAndUpdate(
      id,
      { Title: editTitle },
      { new: true } // Return the updated document after the update is applied
    );

    if (!updatedPicture) {
      return res.status(404).json({ error: "Picture not found." });
    }

    // Return the updated picture data
    res.json(updatedPicture);
  } catch (error) {
    //console.log(error);
    // Handle error if any
    res.status(500).json({ error: "Could not update picture title." });
  }
};

export const createNews = async (req, res) => {
  const { title, newFlag, date, description } = req.body;

  if (!title || !description || !date) {
    res.status(401).json({ msg: "invalid" });
    return;
  }

  const input = new NewsModel({ title, newFlag, date, description });

  try {
    await input.save();
    res.status(200).json({ msg: "success" });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const getNews = async (req, res) => {
  try {
    const data = await NewsModel.find().sort({ _id: -1 });
    res.status(200).json({ msg: "success", data: data });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const deleteNews = async (req, res) => {
  const { id } = req.body;

  try {
    await NewsModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "success" });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const editNews = async (req, res) => {
  const { id, newflag, description } = req.body;

  try {
    const operation = {
      description: description,
      newFlag: newflag,
    };
    await NewsModel.findOneAndUpdate({ _id: id }, operation);
    res.status(200).json({ msg: "success" });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const getHomeNews = async (req, res) => {
  try {
    const data = await NewsModel.find({ newFlag: true }).sort({ _id: -1 });
    res.status(200).json({ msg: "success", data: data });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};

export const createEvents = async (req, res) => {
  const { title, date, description } = req.body;

  if (!title || !description || !date) {
    res.status(401).json({ msg: "invalid" });
    return;
  }

  const input = new EventModel({ title, date, description });

  try {
    await input.save();
    res.status(200).json({ msg: "success" });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const getEvents = async (req, res) => {
  try {
    const data = await EventModel.find().sort({ _id: -1 });
    res.status(200).json({ msg: "success", data: data });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const getEventsOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await EventModel.findOne({ _id: id });
    res.status(200).json({ msg: "success", data: data });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const deleteEvents = async (req, res) => {
  const { id } = req.body;

  try {
    await EventModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "success" });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};
export const editEvents = async (req, res) => {
  const { id, description } = req.body;

  try {
    const operation = {
      description: description,
    };
    await EventModel.findOneAndUpdate({ _id: id }, operation);
    res.status(200).json({ msg: "success" });
    return;
  } catch (error) {
    res.status(502).json({ msg: error });
    return;
  }
};

export const handlestatus = async (req, res) => {
  const { remark, uuid, currentstatus, email, name } = req.body;

  try {
    if (currentstatus === "Approve") {
      // block the user

      await User.findOneAndUpdate({ uuid: uuid }, { status: "Block" });
      BLOCKEDMAIL(email, remark, name);
      res.status(200).json({ msg: name + " Blocked" });
    } else if (currentstatus === "Block") {
      //  unblock the user

      await User.findOneAndUpdate({ uuid: uuid }, { status: "Approve" });
      ACTIVEMAIL(email, name);
      res.status(200).json({ msg: name + " Active" });
    } else if (currentstatus === "NotApprove") {
      await User.findOneAndUpdate({ uuid: uuid }, { status: "Approve" });
      ACTIVEMAIL(email, name);
      res.status(200).json({ msg: name + " Active" });
    } else {
      res.status(404).json({ err: "invalid signature " });
      return;
    }
  } catch (error) {
    res.status(500).json({ err: "invalid signature " });
  }
};

export const handleInstituteCollection = async (req, res) => {
  const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData = xlsx.utils.sheet_to_json(sheet);
  try {
    let CheckInvalid;
    rawData.slice(0, 1).map((entry) => {
      const { Branch, RollNo, Name, Fname } = entry;
      if (!Branch || !RollNo || !Name || !Fname) {
        return (CheckInvalid = false);
      } else {
        return (CheckInvalid = true);
      }
    });

    if (!CheckInvalid) {
      res.status(200).json({ msg: "Invalid Xlxs column ( correct Them )" });
      return;
    }

    const transformedData = rawData.map((entry, i) => ({
      branch: entry.Branch,
      rollNo: entry.RollNo,
      name: entry.Name,
      fatherName: entry.Fname,
    }));

    // //console.log(DBCollection);

    //console.log(transformedData);

    const data = await InstituteModel.insertMany(transformedData);

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (err) {
    if (err.code === 11000) {
      //console.log(err.message);
      res.status(203).json({ msg: err.message });
      return;
    }

    //  11000 duplicate
    res.status(500).json({ error: err });
  }
};

export const getInstituteCollection = async (req, res) => {
  const { rollNo } = req.query;

  try {
    const duplicate = await User.findOne({ rollNo: rollNo });

    if (duplicate) {
      //console.log("exist");
      res.status(201).json({ code: 201, msg: "User exist" });
      return;
    }

    const data = await InstituteModel.findOne({ rollNo: rollNo });
    if (!data) {
      res.status(400).json({ msg: "Not Found" });
      return;
    }
    res.status(200).json({ code: 200, data: data });
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

export const ContactUs = async (req, res) => {
  try {
    const { name, email, message, mobile } = req.body;

    // Create a new ContactUs document
    const contact = new ContactUsModel({
      name,
      email,
      message,
      mobile,
    });

    // Save the document to the database
    await contact.save();

    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const ContactUsGet = async (req, res) => {
  try {
    // Fetch all contact records from the database and sort by 'time' field in descending order
    const contacts = await ContactUsModel.find().sort({ time: -1 }).lean();

    // Parse the ISO 8601 date-time string into a JavaScript Date object

    const newData = contacts.map((item) => {
      let obj = item;

      const isoDateString = item.time;

      const parsedDate = new Date(isoDateString);

      // Format the date in a user-friendly way (e.g., "September 8, 2023, 18:47:15")
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
        // second: "numeric",
        // timeZoneName: "short",
      };
      const formattedDate = parsedDate.toLocaleDateString("en-US", options);

      obj.time = formattedDate;
      return obj;
    });

    res.status(200).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const ContactUsDelete = async (req, res) => {
  const { _id } = req.query;

  // //console.log(_id);

  try {
    await ContactUsModel.findByIdAndDelete(_id);
    res.status(200).json({ msg: `(${_id}) Delete ` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const ContactUsCount = async (req, res) => {
  try {
    // Count the unread contact records where 'read' is false
    const unreadCount = await ContactUsModel.countDocuments({ unread: true });

    res.status(200).json({ unreadCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const UserReqCount = async (req, res) => {
  try {
    // Count the unread contact records where 'read' is false
    const unreadCount = await User.countDocuments({ status: true });

    res.status(200).json({ unreadCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const ContactUsRead = async (req, res) => {
  const { _id } = req.query;

  try {
    await ContactUsModel.findByIdAndUpdate(_id, {
      unread: false,
    });

    res.status(200).json("Success");
  } catch (error) {
    console.error(error);
    clearInterval;
  }
};

///find all users who is pending and also a reference user
export const referencePending = async (req, res) => {
  try {
    const users = await User.find({
      referral: { $ne: null },
      status: "Pending",
    });
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

export const DashBoard = async (req, res) => {
  try {
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

    const UserData = await User.aggregate([
      {
        $group: {
          _id: null,
          AllUser: { $sum: 1 },
          ActiveUser: {
            $sum: {
              $cond: { if: { $eq: ["$status", "Approve"] }, then: 1, else: 0 },
            },
          },
          UnVerifiedUser: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "NotApprove"] },
                then: 1,
                else: 0,
              },
            },
          },
          BlockUser: {
            $sum: {
              $cond: { if: { $eq: ["$status", "Block"] }, then: 1, else: 0 },
            },
          },
          PendingUser: {
            $sum: {
              $cond: { if: { $eq: ["$status", "Pending"] }, then: 1, else: 0 },
            },
          },
        },
      },
    ]);

    console.log(currentMonth, year);
    const data = await DailyDeviceRecordModel.find({
      month: currentMonth,
      year,
    });

    // Calculate the average count
    let Totalcount = 0;
    data.map((item) => {
      let count = parseInt(item.count);
      Totalcount += count;
    });

    const averageCount = (Totalcount / day).toFixed(2);

    res
      .status(200)
      .json({ UserData: UserData[0], Activity: { avg: averageCount } });
  } catch (error) {
    res.status(500).json(error);
  }
};
function processData(sample, id, color) {
  // Create an object to store counts for each range
  const rangeCounts = {
    "1-5": 0,
    "6-10": 0,
    "11-15": 0,
    "16-20": 0,
    "21-25": 0,
    "25-31": 0,
  };

  // Loop through the sample data and update rangeCounts
  sample.forEach((entry) => {
    const day = parseInt(entry.day);
    const count = parseInt(entry.count);

    // Determine the range for the day
    let range = "";
    if (day >= 1 && day <= 5) range = "1-5";
    else if (day >= 6 && day <= 10) range = "6-10";
    else if (day >= 11 && day <= 15) range = "11-15";
    else if (day >= 16 && day <= 20) range = "16-20";
    else if (day >= 21 && day <= 25) range = "21-25";
    else if (day >= 25 && day <= 31) range = "25-31";

    // Update the count for the corresponding range
    if (range) {
      rangeCounts[range] = Math.max(rangeCounts[range], count);
    }
  });

  // Convert rangeCounts to the desired output format
  const result = {
    id: id,
    color: color,
    data: Object.keys(rangeCounts).map((range) => ({
      x: range,
      y: rangeCounts[range],
    })),
  };

  return result;
}
export const monthsTrafficData = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth();
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

    // Calculate first, second, and third months
    let firstMonth, secondMonth, thirdMonth;

    if (currentMonthIndex === 0) {
      // If the current month is January
      firstMonth = {
        month: "Jan",
        year: currentYear,
      };
      secondMonth = {
        month: "Dec",
        year: currentYear - 1,
      };
      thirdMonth = {
        month: "Nov",
        year: currentYear - 1,
      };
    } else if (currentMonthIndex === 1) {
      // If the current month is February
      firstMonth = {
        month: "Feb",
        year: currentYear,
      };
      secondMonth = {
        month: "Jan",
        year: currentYear,
      };
      thirdMonth = {
        month: "Dec",
        year: currentYear - 1,
      };
    } else {
      // For other months
      firstMonth = {
        month: months[currentMonthIndex],
        year: currentYear,
      };
      secondMonth = {
        month: months[currentMonthIndex - 1],
        year: currentYear,
      };
      thirdMonth = {
        month: months[currentMonthIndex - 2],
        year: currentYear,
      };
    }

    let firstProccessData = {},
      secondProccessData = {},
      thirdProccessData = {};

    //  firstMonth
    let firstMonthRawData = await DailyDeviceRecordModel.find(
      firstMonth
    ).lean();

    firstProccessData = processData(
      firstMonthRawData,
      firstMonth.month + "-" + firstMonth.year,
      "#ea03ff"
    );

    //  second
    let secondMonthRawData = await DailyDeviceRecordModel.find(
      secondMonth
    ).lean();

    secondProccessData = processData(
      secondMonthRawData,
      secondMonth.month + "-" + secondMonth.year,
      "#00ffbb"
    );
    //  third
    let thirdMonthRawData = await DailyDeviceRecordModel.find(
      thirdMonth
    ).lean();

    thirdProccessData = processData(
      thirdMonthRawData,
      thirdMonth.month + "-" + thirdMonth.year,

      "#0c18ff"
    );

    //  final arr
    const finalArr = [firstProccessData, secondProccessData, thirdProccessData];

    res.status(200).json({ Traffic: finalArr });
  } catch (error) {
    res.status(500).json(error);
  }
};

function generateEmptyDataStructure(sample, months, CurrentMonth, CurrentYear) {
  // Extract month and year from the first entry in the sample data
  const firstEntry = sample[0];

  // Find the index of the month in the months array
  const monthIndex = months.indexOf(CurrentMonth);
  if (monthIndex === -1) {
    return [];
  }

  // Get the number of days in the month
  const daysInMonth = new Date(CurrentYear, monthIndex + 1, 0).getDate();

  const emptyDataStructure = [
    {
      id: `${CurrentMonth}-${CurrentYear}`,
      color: "00ffbb",
      data: [],
    },
  ];

  for (let i = 1; i <= daysInMonth; i++) {
    const dayEntry = sample.find((entry) => parseInt(entry.day) === i);

    if (dayEntry) {
      emptyDataStructure[0].data.push({
        x: i.toString(),
        y: parseInt(dayEntry.count),
      });
    } else {
      emptyDataStructure[0].data.push({ x: i.toString(), y: 0 });
    }
  }

  return emptyDataStructure;
}
export const OneMonthTrafficData = async (req, res) => {
  const { month, year } = req.query;

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

  try {
    const sample = await DailyDeviceRecordModel.find({ month, year }).lean();
    const trafficValueSum = await DailyDeviceRecordModel.countDocuments({
      month,
      year,
    }).lean();
    const emptyData = generateEmptyDataStructure(sample, months, month, year);

    // avg
    let countSum = 0;
    sample.map((item) => {
      let currentRec = parseInt(item.count);
      countSum += currentRec;
    });

    // //console.log(countSum);
    // //console.log(trafficValueSum);
    let Average = 0;
    const daysInMonth = getDaysInMonth();

    if (countSum || daysInMonth) {
      Average = Number((countSum / daysInMonth).toFixed(3));
    }

    res.status(200).json({ Average, Traffic: emptyData, Total: countSum });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const changePwd = async (req, res) => {
  const { oldpwd, newpwd } = req.body;
  const { userId } = req.admin;

  try {
    const user = await Admin.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ error: "unauthorized" });
    }
    // Compare the password hash
    const match = await bcrypt.compare(oldpwd, user.password);

    if (!match) {
      return res.status(200).json({ code: 0 });
    } else {
      const hashedPassword = await bcrypt.hash(newpwd, 2);
      // //console.log(hashedPassword);
      await Admin.findByIdAndUpdate(userId, { password: hashedPassword });
      return res.status(200).json({ code: 1 });
    }
  } catch (error) {
    // //console.log(error);
    res.status(500).json(error);
    return;
  }
};

// for insterting new admin
export const NewAdmin = async (req, res) => {
  const { username, email, pwd } = req.body;

  if (!username || !email || !pwd) {
    res.status(200).json({ err: "invalid signature " });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(pwd, 2);
    const newUser = new Admin({
      username,
      email,
      password: hashedPassword,
      flag: true,
    });
    await newUser.save();
    res.status(200).json({ msg: "Admin Created " });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const CreatePost = async (req, res) => {
  const { content, url, path } = req.body;

  console.log(req.admin);
  if (req.admin.status !== "Approve") {
    return res.status(404).json({ err: "Not Verified" });
  }

  try {
    // console.log(req.admin);
    const data = new PostModel({
      user: req.admin._id,
      name: req.admin.name,
      avtar: req.admin.avtar,
      image: url,
      path: path,
      content: content,
    });

    const response = await data.save();
    // console.log(req.file);
    res.status(200).json({ post: response });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const AllPost = async (req, res) => {
  // console.log("first");
  const page = parseInt(req.query.page) || 1;

  const perPage = parseInt(req.query.perPage) || 5;
  const _id = req.query.id;

  const skip = (page - 1) * perPage;

  try {
    const totalpost = await PostModel.countDocuments();
    const totalPages = Math.ceil(totalpost / perPage);

    if (_id) {
      const data = await PostModel.find({ user: _id })
        .sort({ _id: -1 }) // Sort in descending order based on _id (timestamp)
        .skip(skip)
        .limit(perPage);
      res.status(200).json({ data: data, totalPages: totalPages });
    } else {
      const data = await PostModel.find()
        .sort({ _id: -1 }) // Sort in descending order based on _id (timestamp)
        .skip(skip)
        .limit(perPage);
      res.status(200).json({ data: data, totalPages: totalPages });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id, image } = req.body;
    //console.log(req.query);
    if (image) {
      deleteImageToStorage(image);
    }
    // Find the picture by its ObjectId and delete it
    await PostModel.findByIdAndDelete(id);

    // Return the deleted picture data
    res.status(200).json({ msg: "success" });
  } catch (error) {
    // Handle error if any
    res.status(500).json({ error: "Could not delete picture." });
  }
};

const TryAgainResponse = () => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Oops! Something Went Wrong</title>
        <style>
          body {
            background-color: #f9eaea;
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
          }
    
          .container {
            background-color: #ffffff;
            border-radius: 6px;
            border: 1px solid #dddddd;
            margin: 20px auto;
            max-width: 600px;
            padding: 20px;
            text-align: center;
          }
    
          h1 {
            color: #f44336; /* Red */
          }
    
          p {
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Oops! Something Went Wrong</h1>
          <p>It seems that something went wrong. Please try again later.</p>
          <p>If the problem persists, please contact support.</p>
        </div>
      </body>
    </html>
    `;
};

const RejectResponse = (referenceUser, newUser) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Reference Rejected</title>
        <style>
          body {
            background-color: #f9eaea;
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
          }
    
          .container {
            background-color: #ffffff;
            border-radius: 6px;
            border: 1px solid #dddddd;
            margin: 20px auto;
            max-width: 600px;
            padding: 20px;
            text-align: center;
          }
    
          h1 {
            color: #f44336; /* Red */
          }
    
          p {
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reference Rejected</h1>
          <p>Dear ${referenceUser},</p>
          <p>The reference for ${newUser} has been rejected.</p>
          <p>If you have any questions or concerns, please feel free to contact us.</p>
          <p>Best regards,</p>
          <p>The College Team</p>
        </div>
      </body>
    </html>
    `;
};

const ApproveResponse = (referenceUser, newUser) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Reference Approved</title>
        <style>
          body {
            background-color: #f9eaea;
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
          }
    
          .container {
            background-color: #ffffff;
            border-radius: 6px;
            border: 1px solid #dddddd;
            margin: 20px auto;
            max-width: 600px;
            padding: 20px;
            text-align: center;
          }
    
          h1 {
            color: #4CAF50; /* Green */
          }
    
          p {
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reference Approved</h1>
          <p>Dear ${referenceUser},</p>
          <p>Thank you for approving the reference for ${newUser}.</p>
          <p>Best regards,</p>
          <p>The College Team</p>
        </div>
      </body>
    </html>
    `;
};

export const responsereferrer = async (req, res) => {
  const { uuid, token, response } = req.query;
  const key = process.env.PrivetKey;

  try {
    const data = await jwt.verify(token, key);

    if (data.uuid === uuid) {
      if (response === "Approve") {
        await User.findOneAndUpdate(
          { _id: data.userid },
          { status: "Approve" }
        );
        res.send(ApproveResponse(data.referrerName, data.userName));
        return;
      } else if (response === "Reject") {
        console.log(data);
        await User.findByIdAndDelete(data.userid);
        res.send(RejectResponse(data.referrerName, data.userName));
        return;
      } else {
        res.send(TryAgainResponse());
        return;
      }
    } else {
      res.send(TryAgainResponse());
    }
  } catch (error) {
    console.log(error);
    res.send(TryAgainResponse());
  }
};
