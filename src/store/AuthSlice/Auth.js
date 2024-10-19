import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

let storedData = localStorage.getItem("userInfo");
let token = storedData ? JSON.parse(storedData).token : null;

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

// get users
export const getUserAction = createAsyncThunk(
    "user/get",
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            //make http call
            const { data } = await axios.get(
                `https://italybackend2.onrender.com/api/v1/users`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": token  // Corrected Authorization header
                    },
                }
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

// edit users


// delete users

export const DeleteUserAction = createAsyncThunk(
    "user/delete",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(
                `https://italybackend2.onrender.com/api/v1/delete-user/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                }
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw new Error("Network error. Please check your connection.");
            }
            return rejectWithValue(error?.response?.data?.message || "Something went wrong while creating the product.");
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

        // get users

        builder.addCase(getUserAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getUserAction.fulfilled, (state, action) => {
            state.users = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(getUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });

        // delete user

        builder.addCase(DeleteUserAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(DeleteUserAction.fulfilled, (state, action) => {
            state.userDelete = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(DeleteUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });

    },
});

export default usersSlices.reducer;