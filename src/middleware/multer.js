import multer from "multer";


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter: (req, file, callback) => {
        const fileTypes = "image/";

        if (fileTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Only images allowed"));
        }
    },
});

export default upload;