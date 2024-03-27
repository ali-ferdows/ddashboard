import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchSessionListThunk} from "./fetchSessionList.js";

const fetchSessionItemThunk = createAsyncThunk(
    'sessions/sessionItem',
    async (sessionId) => {
        const response = await fetch(`/api/scheduled-meeting?id=${sessionId}`);
        const data = await response.json();
        return data;
    }
);

const initialState = {
    sessionItem : [],
    loading : false,
    error : false,
}

const fetchSessionItemSlice = createSlice({
    name : 'sessionItem',
    initialState,
    extraReducers : (builder) => {
        builder
            .addCase(fetchSessionListThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSessionListThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionList = action.payload;
            })
            .addCase(fetchSessionListThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
});

export default fetchSessionItemSlice.reducer;
export { fetchSessionItemThunk };