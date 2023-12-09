const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/user/", userController.createUser);
router.get("/user/", userController.getUsers);
router.put("/user/:id", userController.editUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/user/login/", userController.logIn);

module.exports = router;
