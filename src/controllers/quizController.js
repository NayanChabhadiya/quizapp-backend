const Quiz = require("../models/Quiz");

module.exports = {
  createQuiz: async (req, res) => {
    try {
      const {
        quizTitle,
        scheduleDate,
        scheduleTime,
        quizDuration,
        totalQuestions,
        categoryId,
      } = req.body;
      if (
        !quizTitle ||
        !scheduleDate ||
        !scheduleTime ||
        !quizDuration ||
        !totalQuestions ||
        !categoryId
      ) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newQuizData = new Quiz({
          quizTitle,
          scheduleDate,
          scheduleTime,
          quizDuration,
          totalQuestions,
          categoryId,
        });
        const quizData = await newQuizData.save();
        if (!quizData) {
          res.status(400).json({
            success: false,
            message: "Failed to create quiz",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Quiz created successfully",
            data: quizData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  getQuizzes: async (req, res) => {
    try {
      const quizData = await Quiz.find();
      if (quizData.length === 0) {
        res.status(400).json({ success: false, message: "Quiz not found" });
      } else {
        res.status(200).json({
          success: true,
          message: "Quiz found",
          data: quizData,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  editQuiz: async (req, res) => {
    try {
      const quizId = req.params.id;
      const {
        quizTitle,
        scheduleDate,
        scheduleTime,
        quizDuration,
        totalQuestions,
        categoryId,
      } = req.body;
      if (
        !quizTitle ||
        !scheduleDate ||
        !scheduleTime ||
        !quizDuration ||
        !totalQuestions ||
        !categoryId
      ) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newQuizData = {
          quizTitle,
          scheduleDate,
          scheduleTime,
          quizDuration,
          totalQuestions,
          categoryId,
        };
        const quizData = await Quiz.findByIdAndUpdate(
          { _id: quizId },
          newQuizData,
          { new: true }
        );
        if (!quizMasterData) {
          res.status(400).json({
            success: false,
            message: "Failed to update quiz",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Quiz updated successfully",
            data: quizData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  deleteQuiz: async (req, res) => {
    try {
      const quizId = req.params.id;
      const quizData = await Quiz.deleteOne({ _id: quizId });
      if (quizData.deletedCount === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to delete quiz" });
      } else {
        res.status(200).json({
          success: true,
          message: "Quiz deleted successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
};
