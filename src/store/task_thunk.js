import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    tasksList : [],
    loading : false,
    error : false,
    taskItem : []
}

const fetchTasksThunk = createAsyncThunk(
    'task/taskList',
    async ({pageNumber, formData}) => {

        let titleParam = '';
        let startDateParam = '';
        let endDateParam = '';
        let expertParam = '';
        let statusParam = '';

        if (formData.task_title) {
            titleParam = `q=${formData.task_title}`;
        }

        if (formData.from_date) {
            startDateParam = `&startDate_gte=${formData.from_date}`;
        }

        if (formData.to_date) {
            endDateParam = `&startDate_lte=${formData.to_date}`;
        }

        if (formData.expert) {
            expertParam = `&expert=${formData.expert}`;
        }

        if (formData.status) {
            statusParam = `&status=${formData.status}`;
        }

        const response = await fetch(`/api/tasks?_sort=id&_order=desc&_page=${pageNumber}&${titleParam}${startDateParam}${endDateParam}${expertParam}${statusParam}`);
        let data = await response.json();
        return data;
    }
);

const insertTaskThunk = createAsyncThunk(
    'task/taskInsert',
    async (formData) => {
        const response = await fetch('/api/tasks',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        return data;
    }
);

const fetchSingleTaskThunk = createAsyncThunk(
    'task/taskSingle',
    async (taskId) => {
        const response = await fetch(`/api/tasks/${taskId}`);
        const data = await response.json();
        return data;
    }
);

const fetchTasksList = createSlice({
    name : 'fetchTask',
    initialState,
    extraReducers : (builder) => {
        builder
            .addCase(fetchTasksThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasksList = action.payload;
            })
            .addCase(fetchTasksThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(insertTaskThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasksList = action.payload;
            })
            .addCase(insertTaskThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(fetchSingleTaskThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.taskItem = action.payload;
            })
            .addCase(fetchSingleTaskThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
});

export default fetchTasksList.reducer;
export const tasksListState = state => state.tasksList;
export {fetchTasksThunk, insertTaskThunk, fetchSingleTaskThunk};