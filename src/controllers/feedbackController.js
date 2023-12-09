const Feedback = require("../models/Feedback");

module.exports = {
  createFeedback: async (req, res) => {
    try {
      const { userId, quizId, message } = req.body;
      if (!userId || !quizId || !message) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newScoreData = new Feedback({
          userId,
          quizId,
          message,
        });
        const scoreData = await newScoreData.save();
        if (!scoreData) {
          res.status(400).json({
            success: false,
            message: "Failed to create feedback",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Feedback created successfully",
            data: scoreData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  getFeedbacks: async (req, res) => {
    try {
      const feedbackData = await Feedback.find();
      if (feedbackData.length === 0) {
        res.status(400).json({ success: false, message: "Feedback not found" });
      } else {
        res.status(200).json({
          success: true,
          message: "Feedback found",
          data: feedbackData,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  editFeedback: async (req, res) => {
    try {
      const feedbackId = req.params.id;
      const { userId, quizId, message } = req.body;
      if (!userId || !quizId || !message) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newFeedbackData = {
          userId,
          quizId,
          message,
        };
        const feedbackData = await Feedback.findByIdAndUpdate(
          { _id: feedbackId },
          newFeedbackData,
          { new: true }
        );
        if (!feedbackData) {
          res.status(400).json({
            success: false,
            message: "Failed to update feedback",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Feedback updated successfully",
            data: feedbackData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  deleteFeedback: async (req, res) => {
    try {
      const feedbackId = req.params.id;
      const feedbackeData = await Feedback.deleteOne({ _id: feedbackId });
      if (feedbackeData.deletedCount === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to delete feedback" });
      } else {
        res.status(200).json({
          success: true,
          message: "Feedback deleted successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
};
