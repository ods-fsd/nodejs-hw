import {
    v2 as cloudinary
} from "cloudinary";
import {
    Readable
} from "node:stream";

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const saveFileToCloudinary = async (buffer) => {

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder: "user-avatars",
            overwrite: true,
            resource_type: "image",
            unique_filename: true,
            use_filename: true,
            transformation: [{
                width: 250,
                height: 250,
                crop: "fill"
            }],
        }, (error, result) => {
            error ? reject(error) : resolve(result);
        });

        Readable.from(buffer).pipe(uploadStream);
    });
};