const router = require("express").Router();
const quizMasterController = require("../controllers/quizController");

router.post("/quiz/", quizMasterController.createQuiz);
router.get("/quiz/", quizMasterController.getQuizzes);
router.put("/quiz/:id", quizMasterController.editQuiz);
router.delete("/quiz/:id", quizMasterController.deleteQuiz);

module.exports = router;
