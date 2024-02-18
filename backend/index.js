import mongoose from "mongoose";
import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import * as dotenv from "dotenv";
dotenv.config();

//  routes
import main from "./routes/main.js";
import Admin from "./routes/admin.js";

const DB = process.env.DATABASE_KEY;

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
    app.listen(PORT, () => {
      console.info(`connection success ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
