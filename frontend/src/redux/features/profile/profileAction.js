import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Services/API";

// Update Profile
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async ({ userId, file, semester, branch, bio, city }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('profilePicture', file);
            }
            if (semester) formData.append('semester', semester);
            if (branch) formData.append('branch', branch);
            if (bio) formData.append('bio', bio);
            if (city) formData.append('city', city);

            const response = await API.put(`/profile/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);
