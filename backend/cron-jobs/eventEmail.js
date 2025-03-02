import nodemailer from "nodemailer";
import { EventInvitation } from "../mail/Templates/NewEvent";

const sendEventEmail = async (recipient, name, event) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.MAIL_PWD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: recipient,
    subject: `Invitation: ${event.title}`,
    html: EventInvitatijon(name, event.title, event.date, event.description),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Invitation sent successfully!");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

// // Example Event Data
// const eventDetails = {
//   title: "Annual Alumni Meet 2025",
//   date: "March 15, 2025",
//   time: "10:00 AM - 4:00 PM",
//   location: "GBN Govt Polytechnic Nilokheri Campus",
//   description:
//     "Join us for a day of nostalgia, networking, and celebration. Reconnect with batchmates, meet faculty, and enjoy fun activities!",
// };

// // Send the email
// sendEventEmail("alumni@example.com", "John Doe", eventDetails);
