const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  team: { type: String, required: true },
  role: { type: String, required: true }, // e.g., Batsman, Bowler, All-rounder, Wicket Keeper
  price: { type: Number, required: true, min: 0 }, // New: Player price (minimum 0)
  img: { type: String, required: true }, // Store image URL
});
module.exports = mongoose.model("Player", playerSchema);
