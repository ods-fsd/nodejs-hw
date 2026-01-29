import {
    Schema,
    model
} from "mongoose";
import {
    TAGS
} from "../constants/tags.js";

const noteSchema = new Schema({
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
        enum: TAGS
    },
}, {
    timestamps: true,
    versionKey: false
});

const Note = model("Note", noteSchema);

export default Note;