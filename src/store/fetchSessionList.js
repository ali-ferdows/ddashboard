import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const fetchSessionListThunk = createAsyncThunk(
    'sessions/sessionsList',
    async (params, thunkAPI) => {
        const response = await fetch(`/api/scheduled-meeting`);
        const data = await response.json();
        return data;
    }
);

const deleteSessionThunk = createAsyncThunk(
    'sessions/deleteSession',
    async (sessionId) => {
    const response = await fetch(`/api/scheduled-meeting/${sessionId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
});

const editSessionThunk = createAsyncThunk(
    'sessions/editSession',
    async ({ sessionItem, sessionId }) => {
    const response = await fetch(`/api/scheduled-meeting/${sessionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionItem),
    });
    const data = await response.json();
    return data;
});

const doneSessionThunk = createAsyncThunk(
    'sessions/doneSession',
    async ({ sessionItem, sessionId }) => {
        const response = await fetch(`/api/scheduled-meeting/${sessionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionItem),
        });
        const data = await response.json();
        return data;
    }
);

const initialState = {
    sessionList : [],
    loading : false,
    error : false,
}

const fetchSessionListSlice = createSlice({
    name : 'sessionList',
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
            .addCase(deleteSessionThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionList = state.sessionList.filter((session) => session.id !== action.payload.id);
            })
            .addCase(editSessionThunk.fulfilled, (state, action) => {
                state.loading = false;
                const editedSession = action.payload;
                state.sessionList = state.sessionList.map((session) =>
                    session.id === editedSession.id ? editedSession : session
                );
            });
    }
})

export default fetchSessionListSlice.reducer;
export { fetchSessionListThunk, deleteSessionThunk, editSessionThunk, doneSessionThunk };