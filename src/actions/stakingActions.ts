// import {NFTsSlice} from '@/reducers/NFTsSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { stakingService } from "@/service/staking.service"

export const fetchListLeaderBoard = createAsyncThunk(
    'staking/fetchLeaderBoard',
    async (params, { dispatch, getState }) => {
        const response = await stakingService.getListLeaderBoard(params)
        return response.data
    }
)
