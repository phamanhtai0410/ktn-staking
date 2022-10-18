// import {NFTsSlice} from '@/reducers/NFTsSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { referralService } from "@/service/referral.service"
import { ILeaderBoardParams } from '@/models/referral-models'
import ConnectWallet from '@/components/ConnectWallet'
import { IWeb3Event, useEasyWeb3, Web3Callback, Web3EventType } from '@/service/web3'
import { verifySign } from './userActions'

export const fetchReferralCode = createAsyncThunk(
    'referral/fetchReferralCode',
    async (params:{address:string}, { dispatch, getState }) => {
        const response = await referralService.getReferralCode(params)
        return response.data
    }
)

export const submitReferralCode = createAsyncThunk(
    'referral/submitReferralCode',
    async (params:{address:string, code:string}, { dispatch, getState }) => {
        const response = await referralService.validateReferralCode(params)
        console.log("response", response)

        // const web3callback: Web3Callback = (e: IWeb3Event) => {
        //     switch (e.type) {
        //       case Web3EventType.Provider_Disconnect:
        //         alert(typeof e.data == 'string' ? e.data : JSON.stringify(e.data))
        //         break
        //     }
        //   }
        // const { easyWeb3, connectState, walletInfo } = useEasyWeb3(web3callback)

        // const messageSign = await easyWeb3.getMessageWallet();
        // console.log("messageSign", messageSign)
        if (response?.data && response?.data?.nonce && response?.data?.msg) {
            const signature = await referralService.web3PersonalSign(response.data.msg, params.address)
            console.log("signature", signature)
            let body = {address:params.address,code:params.code,nonce:response.data.nonce,signature:signature}
            if (signature) {
                try {
                    const result = await referralService.submitReferralCode(body)
                    console.log("result", result)
                    alert("Successfully!")
                } catch (error) {
                    console.log("error", error)
                    alert("Errors: "+error.msg)
                }
            }
        }
        // return response.data
    }
)

export const fetchListLeaderBoard = createAsyncThunk(
    'referral/fetchLeaderBoard',
    async (params:ILeaderBoardParams, { dispatch, getState }) => {
        const response = await referralService.getListLeaderBoard(params)
        return response.data
    }
)

export const fetchListLeaderBoardTop3 = createAsyncThunk(
    'referral/fetchLeaderBoardTop3',
    async (params:ILeaderBoardParams, { dispatch, getState }) => {
        const response = await referralService.getListLeaderBoard(params)
        return response.data
    }
)