const Category = require("../models/Category");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { name, userId } = req.body;
      if (!name || !userId) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newCategoryData = new Category({
          name,
          userId,
        });
        const categoryData = await newCategoryData.save();
        if (!categoryData) {
          res.status(400).json({
            success: false,
            message: "Failed to create category",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: categoryData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  getCategories: async (req, res) => {
    try {
      const categoryData = await Category.find();
      if (categoryData.length === 0) {
        res.status(400).json({ success: false, message: "Category not found" });
      } else {
        res.status(200).json({
          success: true,
          message: "Category category found",
          data: categoryData,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  editCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { name, userId } = req.body;
      if (!name || !userId) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const newCategoryData = { name, userId };
        const categoryData = await Category.findByIdAndUpdate(
          { _id: categoryId },
          newCategoryData,
          { new: true }
        );
        if (!categoryData) {
          res.status(400).json({
            success: false,
            message: "Failed to update category",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: categoryData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const categoryData = await Category.deleteOne({ _id: categoryId });
      if (categoryData.deletedCount === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to deletecategory" });
      } else {
        res.status(200).json({
          success: true,
          message: "Category deleted successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
};
