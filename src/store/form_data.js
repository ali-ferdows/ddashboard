import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    formData : {
        session_title: '',
        session_date: '',
        session_time: '',
        invited_expert: '',
        session_point: '',
        session_reminder: '',
        isDone: false,
        is_deleted: false,
    }
};

const sessionFormDataSlice = createSlice({
    name : 'form_data',
    initialState,
    reducers : {
        setFormData : (state, action) => {
            state.formData = action.payload;
        }
    }
});

export const { setFormData } = sessionFormDataSlice.actions;
export const selectFormData = (state) => state.formSession.formData;
export default sessionFormDataSlice.reducer;