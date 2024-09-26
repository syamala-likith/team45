import mongoose from "mongoose";

const Schema = mongoose.Schema;

const managementSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of the string
    minlength: 2, // Minimum length for the name
    maxlength: 50 // Maximum length for the name
  },
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
export const Management = mongoose.model('Management', managementSchema);

