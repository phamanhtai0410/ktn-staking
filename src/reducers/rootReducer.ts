
import { combineReducers } from '@reduxjs/toolkit'

import leaderBoard from "./LeaderBoardSlice"
import myNFTs from "./myNFTsSlice"

const rootReducer = combineReducers({
    leaderBoard,
    myNFTs
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

