const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("users", userSchema);
