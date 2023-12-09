const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    questionAnswer: { type: String, required: true },
    questionTime: { type: String, required: true },
    options: { type: String, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, required: true },
    scoreInterval: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("questions", questionSchema);
