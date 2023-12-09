const Score = require("../models/Score");

module.exports = {
  createScore: async (req, res) => {
    try {
      const { userId, quizId, score } = req.body;
      if (!userId || !quizId || !score) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newScoreData = new Score({
          userId,
          quizId,
          score,
        });
        const scoreData = await newScoreData.save();
        if (!scoreData) {
          res.status(400).json({
            success: false,
            message: "Failed to create score",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Score created successfully",
            data: scoreData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  getScores: async (req, res) => {
    try {
      const scoreData = await Score.find();
      if (scoreData.length === 0) {
        res.status(400).json({ success: false, message: "Score not found" });
      } else {
        res.status(200).json({
          success: true,
          message: "Score found",
          data: scoreData,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  editScore: async (req, res) => {
    try {
      const scoreId = req.params.id;
      const { userId, quizId, score } = req.body;
      if (!userId || !quizId || !score) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newScoreData = {
          userId,
          quizId,
          score,
        };
        const scoreData = await Score.findByIdAndUpdate(
          { _id: scoreId },
          newScoreData,
          { new: true }
        );
        if (!scoreData) {
          res.status(400).json({
            success: false,
            message: "Failed to update score",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Score updated successfully",
            data: scoreData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  deleteScore: async (req, res) => {
    try {
      const scoreId = req.params.id;
      const scoreData = await Score.deleteOne({ _id: scoreId });
      if (scoreData.deletedCount === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to delete score" });
      } else {
        res.status(200).json({
          success: true,
          message: "Score deleted successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
};
