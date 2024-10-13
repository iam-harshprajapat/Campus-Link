import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../Services/API';


//register user
export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ email, name, password, username, mobile, enrollmentNumber, semester, role }, { rejectWithValue }) => {
        try {
            const payload = {
                role: role,
                name: name,
                username: username,
                email: email,
                password: password,
                enrollmentNumber: enrollmentNumber,
                mobile: mobile,
                semester: semester

            }
            const response = await API.post('/auth/register', payload);
            return response.data;
        } catch (error) {
            if (error.response)
                return rejectWithValue(error.response.data.message);
            return rejectWithValue(error)

        }
    }
)
