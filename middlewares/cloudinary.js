const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUD.NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowedFormats: ["jpg", "png"],
        folder: "underdogs-image-center"
    }
});

const uploader = multer({
    storage
});

module.exports = uploader;