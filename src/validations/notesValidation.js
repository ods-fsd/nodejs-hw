import {
    Joi,
    Segments
} from "celebrate";
import {
    TAGS
} from "../constants/tags.js";
import {
    isValidObjectId
} from "mongoose";

const isValidatorNoteId = (value, helpers) => {
    if (!isValidObjectId(value)) {
        return helpers.message('Note id is not valid');
    }
    return value;
};

export const getAllNotesSchema = {
    [Segments.QUERY]: Joi.object({
        page: Joi.number().integer().min(1),
        perPage: Joi.number().integer().min(5).max(20),
        tag: Joi.string().valid(...TAGS),
        search: Joi.string(),
    })
};

export const noteIdSchema = {
    [Segments.PARAMS]: Joi.object({
        noteId: Joi.string().custom(isValidatorNoteId).required(),
    })
};


export const createNoteSchema = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().min(1).required(),
        content: Joi.string(),
        tag: Joi.string().valid(...TAGS),
    })
};

export const updateNoteSchema = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().min(1),
        content: Joi.string(),
        tag: Joi.string().valid(...TAGS),
    }).min(1),
    [Segments.PARAMS]: noteIdSchema
};