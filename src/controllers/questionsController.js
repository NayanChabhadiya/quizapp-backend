const Questions = require("../models/Questions");

module.exports = {
  createQuestion: async (req, res) => {
    try {
      const {
        question,
        questionAnswer,
        questionTime,
        options,
        scoreInterval,
        quizId,
      } = req.body;
      if (
        !question ||
        !questionAnswer ||
        !questionTime ||
        !options ||
        !scoreInterval ||
        !quizId
      ) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newQuestionsData = new Questions({
          question,
          questionAnswer,
          questionTime,
          options,
          scoreInterval,
          quizId,
        });
        const questionData = await newQuestionsData.save();
        if (!questionData) {
          res.status(400).json({
            success: false,
            message: "Failed to create question",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Question created successfully",
            data: questionData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  getQuestions: async (req, res) => {
    try {
      const questionData = await Questions.find();
      if (questionData.length === 0) {
        res
          .status(400)
          .json({ success: false, message: "Questions not found" });
      } else {
        res.status(200).json({
          success: true,
          message: "Questions found",
          data: questionData,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  editQuestion: async (req, res) => {
    try {
      const questionId = req.params.id;
      const {
        question,
        questionAnswer,
        questionTime,
        options,
        scoreInterval,
        quizId,
      } = req.body;
      if (
        !question ||
        !questionAnswer ||
        !questionTime ||
        !options ||
        !scoreInterval ||
        !quizId
      ) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newQuestionsData = {
          question,
          questionAnswer,
          questionTime,
          options,
          scoreInterval,
          quizId,
        };
        const questionData = await Questions.findByIdAndUpdate(
          { _id: questionId },
          newQuestionsData,
          { new: true }
        );
        if (!questionData) {
          res.status(400).json({
            success: false,
            message: "Failed to update question",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Question updated successfully",
            data: questionData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  deleteQuestion: async (req, res) => {
    try {
      const questionId = req.params.id;
      const questionData = await Questions.deleteOne({ _id: questionId });
      if (questionData.deletedCount === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to delete questions" });
      } else {
        res.status(200).json({
          success: true,
          message: "Questions deleted successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
};
