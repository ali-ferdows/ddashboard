import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    taskFormData : {
        task_title : '',
        estimated_time : '',
        priority : 5,
        startDate : '',
        endDate : '',
        expert : '',
        status : '',
        description : '',
        is_deleted: false
    }
};

const taskFormData = createSlice({
    name : 'taskData',
    initialState,
    reducers : {
        setFormData : (state, action) => {
            state.taskFormData = action.payload;
        }
    }
});

export const {setFormData} = taskFormData.actions;
export const taskFormDataState = (state) => state.formTask.taskFormData;
export default taskFormData.reducer