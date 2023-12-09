const router = require("express").Router();
const groupController = require("../controllers/groupController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.post("/group/", groupController.createGroup);
router.get("/group/", authMiddleware, groupController.getGroups);
router.put("/group/:id", groupController.editGroup);
router.delete("/group/:id", groupController.deleteGroup);

module.exports = router;
