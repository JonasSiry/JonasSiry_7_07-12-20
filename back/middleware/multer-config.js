const multer = require("multer")
const { v4: uuidv4 } = require('uuid')

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        callback(null, uuidv4())
    }
})

module.exports = multer({ storage }).single("image")