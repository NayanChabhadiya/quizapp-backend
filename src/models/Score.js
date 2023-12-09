const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("scors", scoreSchema);
