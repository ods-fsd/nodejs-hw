import {
    saveFileToCloudinary
} from "../utils/saveFileToCloudinary.js";
import createHttpError from "http-errors";
import {
    User
} from "../models/user.js";


export const updateUserAvatar = async (req, res) => {

    if (!req.file) {
        throw createHttpError(400, 'No file uploaded');
    }

    const result = await saveFileToCloudinary(req.file.buffer);

    const updatedUser = await User.findOneAndUpdate({
        _id: req.user.id
    }, {
        avatar: result.secure_url
    }, {
        new: true
    });

    res.status(200).json({
        url: updatedUser.avatar,
    });
};