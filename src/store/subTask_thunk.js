import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    subTasksList : [],
    loading : false,
    error : false
}

const fetchSubTaskThunk = createAsyncThunk(
    'subTask/getSubTask',
    async (parentTaskId) => {
        const response = await fetch(`/api/subTasks?parentTaskId=${parentTaskId}&is_deleted=false`);
        const data = await response.json();
        return data;
    }
);

const fetchSubTaskMemberThunk = createAsyncThunk(
    'subTask/getSubTaskMember',
    async ({subTaskExpert, subTaskStartDate, subTaskEndDate, subTaskStatus}) => {

        let startDateParam = '';
        let endDateParam = '';
        let expertParam = '';
        let statusParam = '';
        let isDeletedParam = '&is_deleted=false';

        if (subTaskStartDate) {
            startDateParam = `&subTaskStartDate_gte=${subTaskStartDate}`;
        }

        if (subTaskEndDate) {
            endDateParam = `&subTaskEndDate_lte=${subTaskEndDate}`;
        }

        if (subTaskExpert) {
            expertParam = `&subTaskExpert=${subTaskExpert}`;
        }

        if (subTaskStatus) {
            statusParam = `&subTaskStatus=${subTaskStatus}`;
        }

        const response = await fetch(`/api/subTasks?_sort=id&_order=desc${expertParam}${startDateParam}${endDateParam}${isDeletedParam}${statusParam}`);
        const data = await response.json();
        return data;
    }
)

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
        const data = await response.json();
        return data;
    }
);

const fetchSingleSubTask = createAsyncThunk(
    'subTask/singleSubTask',
    async (subTaskId) => {
        const response = await fetch(`/api/subTasks/${subTaskId}`);
        const data = await response.json();
        return data;
    }
);

const editSubTaskThunk = createAsyncThunk(
    'subTask/editSubTask',
    async ({subTaskEdited, subTaskId}) =>{
        const response = await fetch(`/api/subTasks/${subTaskId}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(subTaskEdited)
        });
        const data = await response.json();
        return data;
    }
);

const deleteSubTaskThunk = createAsyncThunk(
    'subTask/deleteTask',
    async (subTaskId) => {
        const response = await fetch(`/api/subTasks/${subTaskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({is_deleted: true})
        });
        const data = await response.json();
        return data;
    }
)

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
            .addCase(fetchSingleSubTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleSubTask.fulfilled, (state, action) => {
                state.loading = false;
                state.subTasksList = action.payload;
            })
            .addCase(fetchSingleSubTask.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(editSubTaskThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(editSubTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subTasksList = action.payload;
            })
            .addCase(editSubTaskThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteSubTaskThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSubTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subTasksList = action.payload;
            })
            .addCase(deleteSubTaskThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(fetchSubTaskMemberThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubTaskMemberThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subTasksList = action.payload;
            })
            .addCase(fetchSubTaskMemberThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
});

export default subTasksList.reducer;
export const subTasksState = (state) => state.subTasksList;
export { insertSubTasksThunk, fetchSubTaskThunk, fetchSubTaskMemberThunk, fetchSingleSubTask, editSubTaskThunk, deleteSubTaskThunk };