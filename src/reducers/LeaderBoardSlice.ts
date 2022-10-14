import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ILeaderBoardModel, ILeaderBoardArrayModel } from "@/models/redux-models";
import { RootState } from "@/app/store";
import { fetchListLeaderBoard } from "@/actions/stakingActions";

const initialState:ILeaderBoardArrayModel={
    items: [] ,
    pagination:null,
    loading: false
}

const LeaderBoardSlice = createSlice({
    name:'leaderBoard',
    initialState:initialState,
    reducers:{
        setListCollections(state,action:PayloadAction<ILeaderBoardModel[]>){
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListLeaderBoard.fulfilled, (state, action) => {
          // Add user to the state array
          state.items.push(action.payload.items)
            //   state.pagination = {
            //     page: action.payload.page,
            //     num_of_page: action.payload.num_of_page
            //   }
        })
    },
})

export const { setListCollections } = LeaderBoardSlice.actions;
export default LeaderBoardSlice.reducer;

// create and export the selector
export const selectCollections = (state: RootState) => state.leaderBoard.items;