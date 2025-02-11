const express = require("express");
const User = require("../models/User"); // Import User model
const router = express.Router();

/* GET all users */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) res.status(200).json(users);
    else res.status(404).json({ error: "No users found" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* GET user by ID */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ error: "No user found" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* REGISTER a new user */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* UPDATE user (Example: Update username) */
router.put("/:id", async (req, res) => {
  try {
    const { username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username }, { new: true });

    if (updatedUser) res.status(200).json(updatedUser);
    else res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* DELETE user */
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) res.status(200).json({ message: "User deleted successfully" });
    else res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
