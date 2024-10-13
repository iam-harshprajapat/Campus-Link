// noteAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../Services/API';

// Get Courses
export const getCourses = createAsyncThunk(
    'notes/getCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/notes/courses');
            return response.data;
        } catch (error) {
            if (error.response)
                return rejectWithValue(error.response.data.message);
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

// Get Semesters
export const getSemesters = createAsyncThunk(
    'notes/getSemesters',
    async ({ course }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/notes/courses/${encodeURIComponent(course)}/semesters`);
            return response.data;
        } catch (error) {
            if (error.response)
                return rejectWithValue(error.response.data.message);
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

// Get Subjects
export const getSubjects = createAsyncThunk(
    'notes/getSubjects',
    async ({ course, semester }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/notes/courses/${encodeURIComponent(course)}/semesters/${encodeURIComponent(semester)}/subjects`);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

// Get Notes by Subject
export const getNotesBySubject = createAsyncThunk(
    'notes/getNotesBySubject',
    async ({ course, semester, subject }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/notes/courses/${encodeURIComponent(course)}/semesters/${encodeURIComponent(semester)}/subjects/${encodeURIComponent(subject)}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

//upload notes
export const uploadNote = createAsyncThunk(
    'notes/uploadNote',
    async ({ noteData, file }, { rejectWithValue }) => {
        try {
            // Create a FormData object to handle file and text fields
            const formData = new FormData();
            formData.append('course', noteData.course);
            formData.append('semester', noteData.semester);
            formData.append('subject', noteData.subject);
            formData.append('title', noteData.title);
            formData.append('noteFile', file);

            const response = await API.post('/notes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) return rejectWithValue(error.response.data.message);
            return rejectWithValue(error.message);
        }
    }
);