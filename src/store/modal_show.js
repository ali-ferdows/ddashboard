import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalShow : false,
}

const modalShowSlice = createSlice ({
    name: 'modalBS',
    initialState,
    reducers: {
        setModalShow : (state, action) => {
            state.modalShow = action.payload;
        }
    }
});

export const {setModalShow} = modalShowSlice.actions;
export default modalShowSlice.reducer;