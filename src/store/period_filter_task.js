import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    taskFilterForm : {
        task_title : '',
        from_date : '',
        to_date : '',
        expert : '',
        status : ''
    }
}

const taskFilterFormInfo = createSlice({
    name : 'filterFormInfo',
    initialState,
    reducers : {
        setTaskFilterForm : (state, action) => {
            state.taskFilterForm = action.payload;
        }
    }
});

export const taskFilterState = state => state.taskFilterForm.taskFilterForm;
export const {setTaskFilterForm} = taskFilterFormInfo.actions;
export default taskFilterFormInfo.reducer;