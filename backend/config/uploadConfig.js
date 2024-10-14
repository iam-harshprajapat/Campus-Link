const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine upload directory based on the file fieldname
        let uploadPath = '';

        if (file.fieldname === 'noteFile') {
            uploadPath = 'uploads/notes/';
        } else if (file.fieldname === 'profilePicture') {
            uploadPath = 'uploads/user/';
        } else if (file.fieldname === 'postImage') {
            uploadPath = 'uploads/posts/';
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /pdf|jpg|jpeg|png|pptx|doc|xls/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Files of this type are not allowed!');
    }
}

// Initialize upload for different fields
const uploadNoteFile = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 30 }, // 30MB file limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('noteFile');

const uploadProfilePicture = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 30 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profilePicture');


const uploadPostImage = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 30 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('postImage'); // Using 'postImage' for post uploads

// Export all upload functions
module.exports = {
    uploadNoteFile,
    uploadProfilePicture,
    uploadPostImage
};
