import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ILeaderBoardModel, ILeaderBoardArrayModel } from "@/models/redux-models";
import { RootState } from "@/app/store";
import { fetchReferralCode, fetchListLeaderBoard, fetchListLeaderBoardTop3 } from "@/actions/referralActions";
import { IReferralCode } from "@/models/referral-models";

const initialState={
    referralCode:<IReferralCode>{},
    leaderBoard:<ILeaderBoardArrayModel>{},
    leaderBoardTop3:<ILeaderBoardArrayModel>{},
    items: [] ,
    pagination:null,
    loading: false
}

const referralSlice = createSlice({
    name:'referral',
    initialState:initialState,
    reducers:{
        setListCollections(state,action:PayloadAction<ILeaderBoardModel[]>){
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReferralCode.fulfilled, (state, action) => {
            state.referralCode = action.payload
        })
        builder.addCase(fetchListLeaderBoard.fulfilled, (state, action) => {
          state.leaderBoard= action.payload
        })
        builder.addCase(fetchListLeaderBoardTop3.fulfilled, (state, action) => {
            state.leaderBoardTop3.items= action.payload.items.slice(0,Math.min(3,action.payload.items.length))
        })
    },
})

export const { setListCollections } = referralSlice.actions;
export default referralSlice.reducer;

// create and export the selector
export const selectReferralCode = (state: RootState) => state.referral.referralCode;
export const selectLeaderBoard = (state: RootState) => state.referral.leaderBoard;
export const selectLeaderBoardTop3 = (state: RootState) => state.referral.leaderBoardTop3;