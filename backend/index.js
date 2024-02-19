import mongoose from "mongoose";
import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const https = require("https");
const fs = require("fs");

import * as dotenv from "dotenv";
dotenv.config();

//  routes
import main from "./routes/main.js";
import Admin from "./routes/admin.js";

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

app.use((req, res, next) => {
  console.log(req.body)
  next()

})
app.get("/", (req, res) => {
  res.send("gbn server");
});
//  routes
app.use(main);
app.use("/admins", Admin);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.info("DB Connect")
  })
  .catch((e) => {
    console.log(e.message);
  });


if (process.env.NODE_ENV === "production") {
  const fullchainPath = "/etc/letsencrypt/live/almanilokheri.in/fullchain.pem";
  const privkeyPath = "/etc/letsencrypt/live/almanilokheri.in/privkey.pem";

  https
    .createServer(
      // need change pem file
      {
        cert: fs.readFileSync(fullchainPath),
        key: fs.readFileSync(privkeyPath)
      },
      app
    )
    .listen(PORT, () => console.info(`[Server] > Listening on port ${PORT}`));
} else {
  app.listen(PORT, () => console.info(`[Server] > Listening on port ${PORT}`));
}