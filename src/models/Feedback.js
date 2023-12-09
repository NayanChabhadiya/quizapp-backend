const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("feedbacks", feedBackSchema);
