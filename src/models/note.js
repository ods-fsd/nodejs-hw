import mongoose from "mongoose";
import {
    TAGS
} from "../constants/tags.js";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: false,
        default: "",
        trim: true,
    },
    tag: {
        type: String,
        required: false,
        default: "Todo",
        enum: TAGS,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true
});


noteSchema.index({
    title: 'text',
    content: 'text'
});

export const Note = mongoose.model("Note", noteSchema);