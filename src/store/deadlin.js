import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    startDate : '',
    endDate : ''
}

const deadLine = createSlice({
    name: 'deadLine',
    initialState,
    reducers : {
        setStartDate : (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate : (state, action) => {
            state.endDate = action.payload;
        }
    }
});

export default deadLine.reducer;
export const startDateState = state => state.deadLine.startDate;
export const endDataState = state => state.deadLine.endDate;
export const {setStartDate, setEndDate} = deadLine.actions;