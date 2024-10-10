import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";


//category

export const BrandListAction = createAsyncThunk(
    "brand/get",
    async (_, { rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.get(
                `https://italybackend2.onrender.com/api/v1/brand`,
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




const brandSlices = createSlice({
    name: "brand",
    initialState: {
        brand: [],
    },
    extraReducers: (builder) => {
        builder.addCase(BrandListAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(BrandListAction.fulfilled, (state, action) => {
            state.brand = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(BrandListAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });

    },
});

export default brandSlices.reducer;