const express = require('express');
const { uploadNote,
    getCoursesWithNotes,
    getSemestersWithNotes,
    getSubjectsWithNotes,
    getNotesBySubject
} = require('../controllers/notesController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware, uploadNote);
//getting notes
router.get('/courses', authMiddleware, getCoursesWithNotes);
router.get('/courses/:course/semesters', authMiddleware, getSemestersWithNotes);
router.get('/courses/:course/semesters/:semester/subjects', authMiddleware, getSubjectsWithNotes);
router.get('/courses/:course/semesters/:semester/subjects/:subject', authMiddleware, getNotesBySubject);

module.exports = router;


