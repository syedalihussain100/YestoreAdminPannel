import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";


//Login
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            //make http call
            const { data } = await axios.post(
                `https://italybackend2.onrender.com/api/v1/admin`,
                userData,
                config
            );
            //save user into local storage
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);





const userLoginfromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const usersSlices = createSlice({
    name: "users",
    initialState: {
        userAuth: userLoginfromStorage,
    },
    extraReducers: (builder) => {

        // login slicess

        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });

    },
});

export default usersSlices.reducer;