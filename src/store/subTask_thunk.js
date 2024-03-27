import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    subTasksList : [],
    loading : false,
    error : false
}

const fetchSubTaskThunk = createAsyncThunk(
    'subTask/getSubTask',
    async (parentTaskId) => {
        const response = await fetch(`/api/subTasks?parentTaskId=${parentTaskId}`);
        const data = await response.json();
        return data;
    }
);

const insertSubTasksThunk = createAsyncThunk(
    'subTask/subTaskInsert',
    async (subTasksData) => {
        const response = await fetch('/api/subTasks',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subTasksData),
        });
        const data = response.json();
        return data;
    }
);

const subTasksList = createSlice({
    name: 'subTask',
    initialState,
    extraReducers: (builder) =>
        builder
            .addCase(insertSubTasksThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertSubTasksThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subTasksList = action.payload;
            })
            .addCase(insertSubTasksThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(fetchSubTaskThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subTasksList = action.payload;
            })
            .addCase(fetchSubTaskThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
});

export default subTasksList.reducer;
export const subTasksState = (state) => state.subTasksList;
export { insertSubTasksThunk, fetchSubTaskThunk };