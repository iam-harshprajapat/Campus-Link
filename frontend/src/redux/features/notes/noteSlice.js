// noteSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getCourses, getSemesters, getSubjects, getNotesBySubject, uploadNote } from "./noteAction";

const initialState = {
    success: false,
    loading: false,
    courses: [],
    semesters: [],
    subjects: [],
    notes: [],
    uploadedNote: null,
    error: null,
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    extraReducers: (builder) => {
        builder
            // Getting courses
            .addCase(getCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.courses = [];
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.courses = action.payload.courses;
                state.error = null;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.courses = [];
            })
            // Getting semesters
            .addCase(getSemesters.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.semesters = [];
            })
            .addCase(getSemesters.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.semesters = action.payload.semesters;
                state.error = null;
            })
            .addCase(getSemesters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.semesters = [];
            })
            // Getting subjects
            .addCase(getSubjects.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.subjects = [];
            })
            .addCase(getSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.subjects = action.payload.subjects;
                state.error = null;
            })
            .addCase(getSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.subjects = [];
            })
            // Getting notes by subject
            .addCase(getNotesBySubject.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.notes = [];
            })
            .addCase(getNotesBySubject.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.notes = action.payload.notes;
                state.error = null;
            })
            .addCase(getNotesBySubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.notes = [];
            })
            //uploading notes 
            .addCase(uploadNote.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
                state.uploadedNote = null;
            })
            .addCase(uploadNote.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.uploadedNote = action.payload.note;  // Set the uploaded note
                state.error = null;
            })
            .addCase(uploadNote.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
                state.uploadedNote = null;
            });
    }
});

export default noteSlice.reducer;
