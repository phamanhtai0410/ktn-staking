import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { fetchListLeaderBoard, fetchTotalStaked } from "@/actions/stakingActions";
import { ILeaderBoardArrayModel } from "@/models/redux-models";

const initialState={
    tokenId:"",
    totalStaked:0,
    leaderBoard:<ILeaderBoardArrayModel>{},
    leaderBoardTop3:<ILeaderBoardArrayModel>{},
    isOpenModalClaim: false
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
        builder.addCase(fetchListLeaderBoard.fulfilled, (state, action) => {
            state.leaderBoard= action.payload
            if (action.payload.page===1) {
                state.leaderBoardTop3.items= action.payload.items.slice(0,Math.min(3,action.payload.items.length))
            }
        })
    },
})

export const { setLoading } = stakingSlice.actions;
export default stakingSlice.reducer;

// create and export the selector
export const selectStakingId = (state: RootState) => state.staking.tokenId;
export const selectTotalStaked = (state: RootState) => state.staking.totalStaked;
export const selectLeaderBoard = (state: RootState) => state.staking.leaderBoard;
export const selectLeaderBoardTop3 = (state: RootState) => state.staking.leaderBoardTop3;