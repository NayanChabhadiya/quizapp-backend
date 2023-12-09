const Group = require("../models/Group");

module.exports = {
  createGroup: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "Name is required" });
      } else {
        const newGroupData = new Group({
          name,
        });
        const groupData = await newGroupData.save();
        if (!groupData) {
          res
            .status(400)
            .json({ success: false, message: "Failed to create group" });
        } else {
          res.status(200).json({
            success: true,
            message: "Group created successfully",
            data: groupData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  getGroups: async (req, res) => {
    try {
      const groupData = await Group.find();
      if (groupData.length === 0) {
        res.status(400).json({ success: false, message: "Groups not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Groups found", data: groupData });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  editGroup: async (req, res) => {
    try {
      const groupId = req.params.id;
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "Name is required" });
      } else {
        const newGroupData = { name };
        const groupData = await Group.findByIdAndUpdate(
          { _id: groupId },
          newGroupData,
          { new: true }
        );
        if (!groupData) {
          res
            .status(400)
            .json({ success: false, message: "Failed to update group" });
        } else {
          res.status(200).json({
            success: true,
            message: "Group updated successfully",
            data: groupData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  deleteGroup: async (req, res) => {
    try {
      const groupId = req.params.id;
      const groupData = await Group.deleteOne({ _id: groupId });
      if (groupData.deletedCount === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to delete group" });
      } else {
        res.status(200).json({
          success: true,
          message: "Group deleted successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
};
