
import { combineReducers } from '@reduxjs/toolkit'

import leaderBoard from "./LeaderBoardSlice"

const rootReducer = combineReducers({
    leaderBoard,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

