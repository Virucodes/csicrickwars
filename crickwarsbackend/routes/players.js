const express = require("express");
const Player = require("../models/Player"); // Import Player model
const router = express.Router();

/* GET all players (Fetch name, image & price only) */
router.get("/", async (req, res) => {
  try {
    const players = await Player.find({}, "name img price"); // Fetch only required fields
    if (players.length > 0) res.status(200).json(players);
    else res.status(404).json({ error: "No players found" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* GET a single player by ID (Fetch name, image & price only) */
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id, "name img price");
    if (player) res.status(200).json(player);
    else res.status(404).json({ error: "No player found" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* CREATE a new player (With Image & Price) */
router.post("/", async (req, res) => {
  try {
    const { name, age, team, role, price, image } = req.body;
    const newPlayer = new Player({ name, age, team, role, price, image });
    await newPlayer.save();
    res.status(201).json({ message: "Player added successfully", player: newPlayer });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
