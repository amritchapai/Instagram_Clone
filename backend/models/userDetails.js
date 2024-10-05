import mongoose from "mongoose";

//schema for user details
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  DOB: { type: Date, },
  profilePicture: { type: String, default: "" },
  gender: { type: String, enum: ["Male", "Female"] },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  StartedFrom: [{ type: Date, default: Date.now }],
});

//converting schema to model
const User = mongoose.model("User", userSchema);

export default User;
