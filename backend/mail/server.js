import nodemailer from "nodemailer";

import dotenv from "dotenv";
import { Accept } from "./Templates/Accept.js";
import { Reject } from "./Templates/Reject.js";
import { Otp } from "./Templates/Otp.js";
import { Active } from "./Templates/Active.js";
import { Blocked } from "./Templates/Blocked.js";

dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: 465, // secure
//   secure: true,
//   auth: {
//     user: process.env.SENDER_MAIL,
//     pass: process.env.MAIL_PWD,
//   },
// });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.MAIL_PWD,
  },
});

export const ACCEPT = (email, name) => {
  const template = Accept(name);

  const mailOptions = {
    from: `"GBN Alumni" <${process.env.SENDER_MAIL}>`, // sender address
    to: email,
    subject: "Accept!",
    html: template,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      // do something useful
      return info;
    }
  });
};
export const ACTIVEMAIL = (email, name) => {
  const template = Active(name);

  const mailOptions = {
    from: `"GBN Alumni" <${process.env.SENDER_MAIL}>`, // sender address
    to: email,
    subject: "Account Active",
    html: template,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      // do something useful
      return info;
    }
  });
};

export const REJECT = (email, remark, name) => {
  const template = Reject(name, remark);

  const mailOptions = {
    from: `"GBN Alumni" <${process.env.SENDER_MAIL}>`, // sender address
    to: email,
    subject: "Reject",
    html: template,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      // do something useful
      return info;
    }
  });
};
export const BLOCKEDMAIL = (email, remark, name) => {
  const template = Blocked(name, remark);

  const mailOptions = {
    from: `"GBN Alumni" <${process.env.SENDER_MAIL}>`, // sender address
    to: email,
    subject: "ACCOUNT BLOCKED !",
    html: template,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      // do something useful
      return info;
    }
  });
};

export const sentotp = (email, otp) => {
  const template = Otp(otp);

  const mailOptions = {
    from: `"GBN Alumni" <${process.env.SENDER_MAIL}>`, // sender address
    to: email,
    subject: "Otp for registration",
    html: template,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      // do something useful
      return info;
    }
  });
};
