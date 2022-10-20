import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ILeaderBoardModel, ILeaderBoardArrayModel } from "@/models/redux-models";
import { RootState } from "@/app/store";
import { fetchListLeaderBoard, fetchListLeaderBoardTop3 } from "@/actions/stakingActions";

const initialState={
    leaderBoard:<ILeaderBoardArrayModel>{},
    leaderBoardTop3:<ILeaderBoardArrayModel>{},
    isOpenModalClaim: false
}

const LeaderBoardSlice = createSlice({
    name:'leaderBoard',
    initialState:initialState,
    reducers:{
        // setListCollections(state,action:PayloadAction<ILeaderBoardModel[]>){
        //     state.items = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListLeaderBoard.fulfilled, (state, action) => {
            state.leaderBoard= action.payload
        })
        builder.addCase(fetchListLeaderBoardTop3.fulfilled, (state, action) => {
            state.leaderBoardTop3.items= action.payload.items.slice(0,Math.min(3,action.payload.items.length))
        })
    },
})

// export const { setListCollections } = LeaderBoardSlice.actions;
export default LeaderBoardSlice.reducer;

// create and export the selector
export const selectLeaderBoard = (state: RootState) => state.leaderBoard.leaderBoard;
export const selectLeaderBoardTop3 = (state: RootState) => state.leaderBoard.leaderBoardTop3;