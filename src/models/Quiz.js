const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    quizTitle: { type: String, required: true },
    scheduleDate: { type: String, required: true },
    scheduleTime: { type: String, required: true },
    quizDuration: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("quizzes", quizSchema);
