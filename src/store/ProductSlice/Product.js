import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

let storedData = localStorage.getItem("userInfo");
let token = storedData ? JSON.parse(storedData).token : null;


//product
export const ProductListAction = createAsyncThunk(
    "product/get",
    async ({ title }, { rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.get(
                `https://italybackend2.onrender.com/api/v1/product?title=${title}`,
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

// create product

export const CreateProductAction = createAsyncThunk(
    "product/create",
    async ({ title, description, price, brand, category, quantity, address, images }, { rejectWithValue }) => {
        const formData = new FormData();

        // Add product details to form data
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("address", address);

        // Append each image file
        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            const { data } = await axios.post(
                `https://italybackend2.onrender.com/api/v1/product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
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

// delete product

export const DeleteProductAction = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(
                `https://italybackend2.onrender.com/api/v1/product/${id}`,
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



// update product
export const UpdateProductAction = createAsyncThunk(
    "product/update",
    async ({ id, values }, { rejectWithValue }) => {
        const formData = new FormData();

        // Add product details to form data
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("brand", values.brand);
        formData.append("category", values.category);
        formData.append("quantity", values.quantity);
        formData.append("address", values.address);

        // Append each image file
        values.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            const { data } = await axios.put(
                `http://localhost:3000/api/v1/product/${id}`,
                formData,
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
                throw new Error("Network error. Please check your connection.");
            }
            return rejectWithValue(error?.response?.data?.message || "Something went wrong while updating the product.");
        }
    }
);







const productsSlices = createSlice({
    name: "products",
    initialState: {
        product: [],
    },
    extraReducers: (builder) => {

        // product slicess

        builder.addCase(ProductListAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(ProductListAction.fulfilled, (state, action) => {
            state.product = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(ProductListAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });
        builder.addCase(CreateProductAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(CreateProductAction.fulfilled, (state, action) => {
            state.createProduct = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(CreateProductAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });
        builder.addCase(DeleteProductAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(DeleteProductAction.fulfilled, (state, action) => {
            state.deleteProduct = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(DeleteProductAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });
        builder.addCase(UpdateProductAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(UpdateProductAction.fulfilled, (state, action) => {
            state.updateProduct = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(UpdateProductAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload;
            state.serverErr = action?.error?.message;
        });

    },
});

export default productsSlices.reducer;