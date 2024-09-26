import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that email is unique across documents
    match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'] // Regex validation for email format
  },
  pwd: {
    type: String,
    required: true,
    minlength: 6 // Minimum length for the password
  },
});

// Create a model using the schema
export const Admin = mongoose.model('Admin', adminSchema);

