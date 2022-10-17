import { createAsyncThunk } from '@reduxjs/toolkit'
import { stakingService } from "@/service/staking.service"

export const fetchListLeaderBoard = createAsyncThunk(
    'staking/fetchLeaderBoard',
    async (params, { dispatch, getState }) => {
        const response = await stakingService.getListLeaderBoard(params)
        return response.data
    }
)

export const fetchListMyNFTs = createAsyncThunk(
    'staking/myNfts',
    async (params, { dispatch, getState }) => {
        const response = await stakingService.getListMyNFTs(params)
        return response.data
    }
)