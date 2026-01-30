import {
    Segments,
    Joi
} from "celebrate";

const registerUserSchema = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),
};

const loginUserSchema = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

export {
    registerUserSchema,
    loginUserSchema
};