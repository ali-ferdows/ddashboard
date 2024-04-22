import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    membersList : [],
    error: false,
    loading: false
}

const fetchAllMembersThunk = createAsyncThunk(
  "member/fetchAllMembers",
  async () => {
    const response = await fetch("/api/users?is_deleted=false");
    const data = await response.json();
    return data;
  }
);

const deleteMemberThunk = createAsyncThunk(
    'member/deleteMember',
    async (memberId) => {
        const response = await fetch(`/api/users/${memberId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_deleted: true })
        });
        const data = await response.json();
        return data;
    }
);

const editMemberThunk = createAsyncThunk(
    'member/editMember',
    async ({ memberInfo, memberId }) => {
        const response = await fetch(`/api/users/${memberId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberInfo),
        });
        const data = await response.json();
        return data;
    });

const fetchSingleMemberThunk = createAsyncThunk(
    'member/fetchSingleMember',
    async (memberId) => {
        const response = await fetch(`/api/users?id=${memberId}`);
        const data = await response.json();
        return data;
    }
);

const fetchMembersListSlice = createSlice({
    name : "members",
    initialState,
    extraReducers : (builder) => {
        builder
            .addCase(fetchAllMembersThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllMembersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.membersList = action.payload;
            })
            .addCase(fetchAllMembersThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteMemberThunk.fulfilled,(state, action) => {
                state.loading = false;
                state.membersList = state.membersList.filter((member) => member.id !== action.payload.id);
            })
            .addCase(fetchSingleMemberThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleMemberThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.membersList = action.payload;
            })
            .addCase(fetchSingleMemberThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(editMemberThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.membersList = action.payload;
            });
    }
});

export default fetchMembersListSlice.reducer;
export const memberState = (state) => state.membersList;
export {fetchAllMembersThunk, deleteMemberThunk, fetchSingleMemberThunk, editMemberThunk};