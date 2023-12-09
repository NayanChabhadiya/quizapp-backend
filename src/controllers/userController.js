const User = require("../models/User");
const Group = require("../models/Group");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SecretKey } = require("../../config");

module.exports = {
  createUser: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        contactNumber,
        username,
        password,
        groupId,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !contactNumber ||
        !username ||
        !password ||
        !groupId
      ) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUserData = new User({
          firstName,
          lastName,
          email,
          contactNumber,
          username,
          password: passwordHash,
          groupId,
        });
        const userData = await newUserData.save();
        if (!userData) {
          res
            .status(400)
            .json({ success: false, message: "Failed to create user" });
        } else {
          userData.password = undefined;
          res.status(200).json({
            success: true,
            message: "User created successfully",
            data: userData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const userData = await User.find();
      if (userData.length === 0) {
        res.status(400).json({ success: false, message: "Users not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Users found", data: userData });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  editUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const {
        firstName,
        lastName,
        email,
        contactNumber,
        username,
        password,
        groupId,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !contactNumber ||
        !username ||
        !password ||
        !groupId
      ) {
        res
          .status(400)
          .json({ success: false, message: "All filed are required" });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUserData = {
          firstName,
          lastName,
          email,
          contactNumber,
          username,
          password: passwordHash,
          groupId,
        };
        const userData = await User.findByIdAndUpdate(
          { _id: userId },
          newUserData,
          { new: true }
        );
        if (!userData) {
          res
            .status(400)
            .json({ success: false, message: "Failed to update user" });
        } else {
          userData.password = undefined;
          res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: userData,
          });
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const userData = await User.deleteOne({ _id: userId });
      if (userData.deletedCount === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to delete user" });
      } else {
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password  are required",
        });
      } else {
        const userData = await User.findOne({ email });
        if (!userData) {
          res
            .status(400)
            .json({ success: false, message: "Email or password is wrong" });
        } else {
          const isMatch = await bcrypt.compare(password, userData.password);
          if (!isMatch) {
            res
              .status(400)
              .json({ success: false, message: "Email or password is wrong" });
          } else {
            const token = await jwt.sign(
              { id: userData._id, email: userData.email },
              SecretKey,
              {
                expiresIn: "1d",
              }
            );
            res.status(200).json({
              success: true,
              message: "User logged in successfully",
              //   data: userData,
              token,
            });
          }
        }
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  },
};
