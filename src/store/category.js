import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    category : {
        category_name : '',
        category_en_name : ''
    }
}

const categorySlice = createSlice({
    name : 'categoryName',
    initialState,
    reducers : {
        setCategory : (state, action) => {
            state.category = action.payload;
        }
    }
});

export const {setCategory} = categorySlice.actions;
export const categoryState = state => state.category.category;
export default categorySlice.reducer;