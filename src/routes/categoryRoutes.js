const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.post("/category/", categoryController.createCategory);
router.get("/category/", categoryController.getCategories);
router.put("/category/:id", categoryController.editCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
