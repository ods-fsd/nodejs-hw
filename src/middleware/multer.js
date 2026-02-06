import multer from "multer";
import createHttpError from 'http-errors';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        } else {
            callback(createHttpError(400, "Only images allowed"), false);
        }
    },
});

export default upload;