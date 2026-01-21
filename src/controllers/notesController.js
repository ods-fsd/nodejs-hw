import Note from "../models/note.js";
import createError from "http-errors";

export const getNotes = async (req, res) => {
    const notes = await Note.find();
    res.status(200).json(notes);

    if (!notes) {
        return res.status(404).json({
            message: 'Notes not found'
        });
    }
};

export const getNoteById = async (req, res, next) => {
    const {
        noteId
    } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
        next(createError(404, 'Note not found'));
        return;
    }

    res.status(200).json(note);
};

export const createNote = async (req, res) => {
    const note = await Note.create(req.body);
    res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
    const {
        noteId
    } = req.params;
    const note = await Note.findOneAndDelete({
        _id: noteId,
    });

    if (!note) {
        next(createError(404, "Note not found"));
        return;
    }

    res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
    const {
        noteId
    } = req.params;

    const note = await Note.findOneAndUpdate({
            _id: noteId
        },
        req.body, {
            new: true
        },
    );

    if (!note) {
        next(createError(404, 'Note not found'));
        return;
    }

    res.status(200).json(note);
};