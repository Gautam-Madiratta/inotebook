const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { validationResult, body } = require("express-validator");

//Route 1 : Get all the notes using :GET "/api/auth/user" Login Required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//Route 2 : Add a new note using :post "/api/auth/addnote" Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast five character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

//Route 3 : Updating a existing note using :PUT "/api/auth/updatenote" Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be update

    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Found");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

//Route 4 : Updating a existing note using :GET "/api/auth/updatenote" Login Required
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be deleted

    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Found");
    }

    note = await Notes.findByIdAndDelete(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ Successs: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

module.exports = router;
