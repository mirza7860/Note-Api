// note create read update delete

import Note from "../Model/NoteModel.js";
import User from "../Model/UserModel.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import ValidationCheck from "../Utils/ValidationCheck.js";

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return new ValidationCheck(400, "Title and Content Required.");
    }
    if (title.trim() === "") {
      return new ValidationCheck(400, "Note must contain a title.");
    }
    if (content.trim() === "") {
      return new ValidationCheck(400, "Note must contain contents.");
    }
    const newNote = new Note({ title, content, userName: req.user._id });

    await newNote.save();
    req.user.notes.push(newNote._id);
    await req.user.save();

    return res.status(200).json(new ApiResponse(200, { newNote }));
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }));
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("userName", "userName");
    return res.status(200).json(new ApiResponse(200, { notes }));
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }));
  }
};

const getUserNotes = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found."));
    }

    const userNotes = await Promise.all(
      user.notes.map(async (id) => {
        const singleNote = await Note.findById(id).populate(
          "userName",
          "userName"
        );
        return singleNote;
      })
    );

    return res.status(200).json(new ApiResponse(200, { data: userNotes }));
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }));
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(noteId, { title, content });
    return res
      .status(200)
      .json(new ApiResponse(200, { message: "Note is updated successfully." }));
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }));
  }
};
const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    await Note.deleteOne({ _id: noteId });
    return res
      .status(200)
      .json(new ApiResponse(200, { message: "Note is deleted successfully." }));
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }));
  }
};
export { createNote, getAllNotes, getUserNotes, updateNote, deleteNote };
