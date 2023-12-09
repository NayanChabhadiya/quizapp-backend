const router = require("express").Router();
const scoreController = require("../controllers/scoreController");

router.post("/score/", scoreController.createScore);
router.get("/score/", scoreController.getScores);
router.put("/score/:id", scoreController.editScore);
router.delete("/score/:id", scoreController.deleteScore);

module.exports = router;
