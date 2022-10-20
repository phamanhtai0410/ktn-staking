import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const initialState={
    tokenId:"",
}

const stakingSlice = createSlice({
    name:'staking',
    initialState:initialState,
    reducers:{setLoading(state,action){
        state.tokenId = action.payload.tokenId;
    },},
    extraReducers: (builder) => {
    },
})

export const { setLoading } = stakingSlice.actions;
export default stakingSlice.reducer;

// create and export the selector
export const selectStakingId = (state: RootState) => state.staking.tokenId;