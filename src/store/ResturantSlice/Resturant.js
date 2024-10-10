import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

let storedData = localStorage.getItem("userInfo");
let token = storedData ? JSON.parse(storedData).token : null;


//category

export const ResturantListAction = createAsyncThunk(
    "resturant/get",
    async (_, { rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        };
        try {
            const { data } = await axios.get(
                `https://italybackend2.onrender.com/api/v1/resturant`,
                config
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




const resturantSlices = createSlice({
    name: "Resturant",
    initialState: {
        resturant: [],
    },
    extraReducers: (builder) => {
        builder.addCase(ResturantListAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(ResturantListAction.fulfilled, (state, action) => {
            state.resturant = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(ResturantListAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });

    },
});

export default resturantSlices.reducer;