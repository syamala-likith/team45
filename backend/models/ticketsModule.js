import mongoose from "mongoose";

// Define the Ticket Schema
const ticketSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"], // Basic email validation
  },
  managementEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"], // Basic email validation
  },
  description: {
    type: String,
    required: true,
    maxlength: 500, // Optional: limit the description length
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "solved"], // Define specific statuses for tickets
    default: "pending", // Set default status to "open"
  },
  type: {
    type: String,
    enum: ["Technical", "Academic", "Administrative", "other"], // Define types of tickets
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the Ticket model
export const Ticket = mongoose.model("Ticket", ticketSchema);
