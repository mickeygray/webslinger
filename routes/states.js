const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const UserState = require("../models/UserState.js");

router.get("/:id", auth, async (req, res) => {
 // console.log(req);
 const state = await UserState.findById(req.params.id);

 res.json(state);
});

router.get("/", auth, async (req, res) => {
 const states = await UserState.find({ user: req.query.q });

 res.json(states);
});

router.post("/", auth, async (req, res) => {
 const newState = new UserState({ ...req.body });

 res.json(newState);
});

router.put("/:id", auth, async (req, res) => {
 let newState = await UserState.findByIdAndUpdate(
  req.params.id,
  { $set: req.body },
  { new: true }
 );

 res.json(newState);
});

router.delete("/:id", auth, async (req, res) => {
 try {
  let state = await UserState.findById(req.params.id);

  if (!state) return res.status(404).json({ msg: "state not found" });

  await UserState.findByIdAndRemove(req.params.id);

  res.json({ msg: "article removed" });
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

module.exports = router;
