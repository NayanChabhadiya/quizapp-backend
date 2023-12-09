const router = require("express").Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/feedback/", feedbackController.createFeedback);
router.get("/feedback/", feedbackController.getFeedbacks);
router.put("/feedback/:id", feedbackController.editFeedback);
router.delete("/feedback/:id", feedbackController.deleteFeedback);

module.exports = router;
