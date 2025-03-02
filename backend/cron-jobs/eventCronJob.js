import { EventModel, User } from "../DB/user.js";

// Function to check for events and execute a task
export async function runEventEmailTask() {
  try {
    const events = await EventModel.find().sort({ createdAt: -1 }).limit(1);
    if (events.length > 0) {
      console.log("✅ Event found! Running the task...");
      await performTask(events);
    } else {
      console.log("🚫 No event today. Skipping task.");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Function to perform the actual task
async function performTask(event) {
  console.log("🔹 Executing the task...");
  const users = await User.find({ status: "Approve" });

  for (let user of users) {
    await sendEventEmail(user.email, user.name, event);
  }
  // Add your task logic here (e.g., send emails, update records, etc.)
}

console.log("🚀 Cron job scheduled. Waiting for execution...");
