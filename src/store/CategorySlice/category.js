import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";


//category

export const CategoryListAction = createAsyncThunk(
    "category/get",
    async (_, { rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.get(
                `https://italybackend2.onrender.com/api/v1/category`,
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




const categorySlices = createSlice({
    name: "category",
    initialState: {
        category: [],
    },
    extraReducers: (builder) => {
        builder.addCase(CategoryListAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(CategoryListAction.fulfilled, (state, action) => {
            state.category = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(CategoryListAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });

    },
});

export default categorySlices.reducer;