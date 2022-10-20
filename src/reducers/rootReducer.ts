
import { combineReducers } from '@reduxjs/toolkit'

import wallet from "./walletSlice"
import leaderBoard from "./LeaderBoardSlice"
import myNFTs from "./myNFTsSlice"
import referral from './referral'
import alert from './alert'

const rootReducer = combineReducers({
    wallet,
    leaderBoard,
    myNFTs,
    referral,
    alert,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

