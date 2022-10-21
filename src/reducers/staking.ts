import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { fetchTotalStaked } from "@/actions/stakingActions";

const initialState={
    tokenId:"",
    totalStaked:0,
}

const stakingSlice = createSlice({
    name:'staking',
    initialState:initialState,
    reducers:{setLoading(state,action){
        state.tokenId = action.payload.tokenId;
    },},
    extraReducers: (builder) => {
        builder.addCase(fetchTotalStaked.fulfilled, (state, action) => {
            state.totalStaked = action.payload.total
        })
    },
})

export const { setLoading } = stakingSlice.actions;
export default stakingSlice.reducer;

// create and export the selector
export const selectStakingId = (state: RootState) => state.staking.tokenId;
export const selectTotalStaked = (state: RootState) => state.staking.totalStaked;