const router = require("express").Router();
const questionsController = require("../controllers/questionsController");

router.post("/question/", questionsController.createQuestion);
router.get("/question/", questionsController.getQuestions);
router.put("/question/:id", questionsController.editQuestion);
router.delete("/question/:id", questionsController.deleteQuestion);

module.exports = router;
