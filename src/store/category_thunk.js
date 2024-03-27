import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    error : false,
    categoryList : []
}

const categoryThunk = createAsyncThunk(
    'category/fetchCategory',
    async () => {
        const response = await fetch('/api/category_session');
        const data = await response.json();
        return data;
    }
);

const insertCategoryThunk = createAsyncThunk(
    'category/insertCategory',
    async (category) => {
        const response = await fetch(`/api/category_session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        const data = await response.json();
        return data;
    }
)

const fetchCategoryThunk = createSlice({
    name : 'fetchCategory',
    initialState,
    extraReducers : (builder) => {
        builder
            .addCase(categoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryThunk.rejected, (state) => {
                state.error = true;
            })
            .addCase(categoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryList = action.payload;
            })
            .addCase(insertCategoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertCategoryThunk.rejected, (state) => {
                state.error = true;
            })
            .addCase(insertCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryList = action.payload;
            })
    }
});

export default fetchCategoryThunk.reducer;
export {categoryThunk, insertCategoryThunk};