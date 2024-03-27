import {createSlice} from "@reduxjs/toolkit";
import moment from "moment-jalaali";

const initialState = {
    date : moment().format('jYYYY/jM/jD'),
};

const selectedSessionDateSlice = createSlice({
    name: 'selectedSessionDate',
    initialState,
    reducers: {
        setDate : (state, action) => {
            state.date = action.payload;
        }
    }
});

export const {setDate} = selectedSessionDateSlice.actions;
export const selectDate = (state) => state.selectedSession.date;
export default selectedSessionDateSlice.reducer;