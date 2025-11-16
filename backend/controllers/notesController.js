const asyncHandler = require('express-async-handler');
const { uploadNoteFile } = require('../config/uploadConfig');
const Note = require('../models/Note');

// @desc    Upload a new note
// @route   POST /api/notes/upload
// @access  Private
const uploadNote = async (req, res) => {
    try {
        const { course, semester, subject, title, fileUrl, fileType, fileSize } = req.body;
        const userId = req.user.id;

        if (!course || !semester || !subject || !title || !fileSize || !fileType || !fileUrl) {
            return res.status(400).send({
                success: false,
                message: "All fields required",
                requiredFields: "course, semester, subject, title, fileUrl, fileType, fileSize"
            });
        }

        await Note.create({
            course,
            semester,
            subject,
            title,
            fileUrl,
            fileType,
            fileSize,
            uploadedBy: userId
        });

        return res.status(201).send({
            success: true,
            message: "Note uploaded successfully"
        });

    } catch (error) {
        console.log("[ERROR]: ", error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
};


// @desc    Get all courses with notes
// @route   GET /api/notes/courses
// @access  Private
const getCoursesWithNotes = asyncHandler(async (req, res) => {
    try {
        const courses = await Note.distinct('course');
        if (courses.length === 0) {
            return res.status(404).json({ success: false, message: 'No courses found with notes' });
        }
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @desc    Get all semesters with notes under a specific course
// @route   GET /api/notes/courses/:course/semesters
// @access  Private
const getSemestersWithNotes = asyncHandler(async (req, res) => {
    const { course } = req.params;

    try {
        const semesters = await Note.distinct('semester', { course });
        if (semesters.length === 0) {
            return res.status(404).json({ success: false, message: `No semesters found with notes for course ${course}` });
        }
        res.status(200).json({ success: true, semesters });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @desc    Get all subjects with notes under a specific semester and course
// @route   GET /api/notes/courses/:course/semesters/:semester/subjects
// @access  Private
const getSubjectsWithNotes = asyncHandler(async (req, res) => {
    const { course, semester } = req.params;

    try {
        const subjects = await Note.distinct('subject', { course, semester });
        if (subjects.length === 0) {
            return res.status(404).json({ success: false, message: `No subjects found with notes for course ${course} and semester ${semester}` });
        }
        res.status(200).json({ success: true, subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @desc    Get all notes files under a specific subject, semester, and course
// @route   GET /api/notes/courses/:course/semesters/:semester/subjects/:subject
// @access  Private
const getNotesBySubject = asyncHandler(async (req, res) => {
    const { course, semester, subject } = req.params;

    try {
        const notes = await Note.find({ course, semester, subject });
        if (notes.length === 0) {
            return res.status(404).json({ success: false, message: `No notes found for course ${course}, semester ${semester}, and subject ${subject}` });
        }
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = {
    uploadNote,
    getCoursesWithNotes,
    getSemestersWithNotes,
    getSubjectsWithNotes,
    getNotesBySubject,
};
