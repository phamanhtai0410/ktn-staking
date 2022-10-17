// import {NFTsSlice} from '@/reducers/NFTsSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { referralService } from "@/service/referral.service"

export const fetchListLeaderBoard = createAsyncThunk(
    'referral/fetchLeaderBoard',
    async (params, { dispatch, getState }) => {
        const response = await referralService.getListLeaderBoard(params)
        return response.data
    }
)

export const fetchListLeaderBoardTop3 = createAsyncThunk(
    'referral/fetchLeaderBoardTop3',
    async (params, { dispatch, getState }) => {
        const response = await referralService.getListLeaderBoard(params)
        return response.data
    }
)