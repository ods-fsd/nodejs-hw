import {
    Schema
} from "mongoose";
import mongoose from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    tag: {
        type: String,
        required: true,
        enum: ["work", "personal", "shopping", "meeting", "ideas", "travel", "finance", "health", "important", "todo"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        timestamps: true,
    },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;