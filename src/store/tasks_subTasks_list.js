import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    theMemberTasksList: [],
    theMemberSubTasksList : []
}

const taskListSlice = createSlice({
    name: 'theMemberTasks',
    initialState,
    reducers: {
        setTheMemberTasksList : (state, action) => {
            state.theMemberTasksList = action.payload;
        },
        setTheMemberSubTasksList : (state, action) => {
            state.theMemberSubTasksList = action.payload;
        }
    }
});

export default taskListSlice.reducer;
export const {setTheMemberTasksList, setTheMemberSubTasksList} = taskListSlice.actions;