import express from "express";
import { AUTHENTICATE_USER } from "../Middleware/AUTHENTIC_USER.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getUserNotes,
  updateNote,
} from "../Controller/NoteController.js";

const router = express.Router();

//GET Routes

router.get("/notes", getAllNotes);
router.get("/notes/:userId", getUserNotes);

//POST Routes

router.post("/notes", AUTHENTICATE_USER, createNote);

//PATCH Routes

router.patch("/notes/:noteId", AUTHENTICATE_USER, updateNote);

//DELETE Routes

router.delete("/notes/:noteId", AUTHENTICATE_USER, deleteNote);
export default router;
