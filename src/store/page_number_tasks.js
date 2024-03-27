import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    pageNumber : 1
};

const pageNumberTasks = createSlice({
    name: 'pageNumberTasks',
    initialState,
    reducers : {
        incrementPageNumberTasks : (state) => {
            state.pageNumber = state.pageNumber + 1;
        },

        decrementPageNumberTasks : (state) => {
            if (state.pageNumber > 1) {
                state.pageNumber = state.pageNumber - 1;
            }
        }
    }
});

export const {incrementPageNumberTasks, decrementPageNumberTasks} = pageNumberTasks.actions;
export const pageNumberTasksState = state => state.pageNumberTasks.pageNumber;
export default pageNumberTasks.reducer;