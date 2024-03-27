import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedExperts : []
}

const guestExpertsSession = createSlice({
    name : 'select_expert',
    initialState,
    reducers : {
        setSelectedExperts : (state, action) => {
            state.selectedExperts = action.payload;
        },
        deleteEmailExpert : (state, action) => {
            state.selectedExperts = state.selectedExperts.filter(value => value != action.payload.item)
        }
    }
});

export const { setSelectedExperts, deleteEmailExpert } = guestExpertsSession.actions;
export default guestExpertsSession.reducer;