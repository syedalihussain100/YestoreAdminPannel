import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../store/AuthSlice/Auth'
import ProductReducer from '../store/ProductSlice/Product'
import CategoryReducer from '../store/CategorySlice/category';
import BrandReducer from '../store/BrandSlice/Brand';
import ResturantReducer from '../store/ResturantSlice/Resturant';


export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        product: ProductReducer,
        category: CategoryReducer,
        brand: BrandReducer,
        resturant: ResturantReducer,
    },
})