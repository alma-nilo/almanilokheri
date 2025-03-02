import mongoose from "mongoose";
import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import cron from "node-cron";

import * as dotenv from "dotenv";
dotenv.config();

//  routes
import main from "./routes/main.js";
import Admin from "./routes/admin.js";
import { User } from "./DB/user.js";
import { runEventEmailTask } from "./cron-jobs/eventCronJob.js";

const DB = process.env.DATABASE_KEY;

// console.log("env DATABASE_KEY : ", process.env.DATABASE_KEY)
// console.log("env PrivetKey : ", process.env.PrivetKey)
// console.log("env SENDER_MAIL : ", process.env.SENDER_MAIL)
// console.log("env MAIL_PWD : ", process.env.MAIL_PWD)
// console.log("env AWS_Access_key : ", process.env.AWS_Access_key)
// console.log("env AWS_secret_key : ", process.env.AWS_secret_key)
// console.log("env AWS_S3_BUCKET : ", process.env.AWS_S3_BUCKET)
// console.log("env AWS_REGION : ", process.env.AWS_REGION)

const app = Express();
// app.use(Express.static("build"));
// app.use(history());
// app.use(Express.static("build"));

const PORT = process.env.PORT || 5000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ extended: true, limit: "50mb" }));

app.use(Express.json());

app.use(cors());

// --------------------------deployment------------------------------

// const __dirname1 = path.resolve();

// app.use(Express.static(path.join(__dirname1, "/client/build")));

// app.get("/", (req, res) =>
//   res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
// );
// --------------------------deployment------------------------------

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    // console.log(req.body)
    next();
  });
}

app.get("/", (req, res) => {
  res.send("gbn server");
});

app.use(main);
app.use("/admins", Admin);

// Schedule the job to run every 24 hours at midnight
cron.schedule(
  // "0 0 * * *",
  "0 12 * * *",
  async () => {
    console.log("⏳ Running daily cron job...");
    await runEventEmailTask();
  },
  {
    timezone: "Asia/Kolkata", // Adjust timezone if needed
  }
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      const fullchainPath =
        "/etc/letsencrypt/live/almanilokheri.in/fullchain.pem";
      const privkeyPath = "/etc/letsencrypt/live/almanilokheri.in/privkey.pem";

      https
        .createServer(
          // need change pem file
          {
            cert: fs.readFileSync(fullchainPath),
            key: fs.readFileSync(privkeyPath),
          },
          app
        )
        .listen(PORT, () =>
          console.info(`[Server] > Listening on port ${PORT}`)
        );
    } else {
      app.listen(PORT, () =>
        console.info(`[Server] > Listening on port ${PORT}`)
      );
    }
  })
  .catch((e) => {
    // console.log(e.message);
  });

// let flag = false;
// const bulkSave = async () => {
//   const data = fs.readFileSync("./userData.json");
//   if (flag !== true) {
//     await User.insertMany(data);
//     flag = true;
//   }
// };

// bulkSave()
