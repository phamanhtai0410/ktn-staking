
import { combineReducers } from '@reduxjs/toolkit'

import leaderBoard from "./LeaderBoardSlice"
import myNFTs from "./myNFTsSlice"
import referral from './referral'

const rootReducer = combineReducers({
    leaderBoard,
    myNFTs,
    referral
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

