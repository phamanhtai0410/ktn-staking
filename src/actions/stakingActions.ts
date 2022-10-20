import { createAsyncThunk } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

import { RootState } from '@/reducers/rootReducer'
import { stakingService } from "@/service/staking.service"

import ABI_STAKING from '@/_contract/ABI_STAKING_V3.json';
import ABI_NFT from '@/_contract/ABI_NFT_V7.json';

import { ILeaderBoardParams } from '@/models/referral-models';
const ADDRESS_STAKING = "0x3E9DFe8715d4034AF6F3A070F0C07Ff2B1bc2fCB";
const ADDRESS_NFT = "0xB1D14A0a8d8794Ef319bfa84601b95C3D2eB5A42"
  
export const fetchListLeaderBoard = createAsyncThunk(
    'staking/fetchLeaderBoard',
    async (params:ILeaderBoardParams, { dispatch, getState }) => {
        const response = await stakingService.getListLeaderBoard(params)
        return response.data
    }
)

export const fetchListLeaderBoardTop3 = createAsyncThunk(
    'staking/fetchLeaderBoardTop3',
    async (params:ILeaderBoardParams, { dispatch, getState }) => {
        const response = await stakingService.getListLeaderBoard(params)
        return response.data
    }
)

export const fetchListMyNFTs = createAsyncThunk(
    'staking/myNfts',
    async (params:{address:string}, { dispatch, getState }) => {
        const response = await stakingService.getListMyNFTs(params)
        return response.data
    }
)


export const stakeNFT = createAsyncThunk(
    'staking/stakeNFT',
    async (params:any, { dispatch, getState ,rejectWithValue}) => {

        const rootState = getState() as RootState;
        const  { easyWeb3 ,address} = rootState.wallet;

        const signer = easyWeb3.getSigner();

        const { token_id } = params;

        try {

            if(signer && token_id && ADDRESS_NFT ){

                const contractStaking = new ethers.Contract(
                    ADDRESS_STAKING,
                    ABI_STAKING,
                    signer,
                )

                let nftTxn = await contractStaking.stake(
                    token_id,
                    ADDRESS_NFT
                );
        
                console.log("Mining... please wait");
                await nftTxn.wait();
        
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

            }
            
            
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const unStakeNFT = createAsyncThunk(
    'staking/unStakeNFT',
    async (params:any, { dispatch, getState ,rejectWithValue}) => {

        const rootState = getState() as RootState;
        const  { easyWeb3 ,address} = rootState.wallet;

        const signer = easyWeb3.getSigner();

        const { token_id } = params;

        try {

            if(signer && token_id && ADDRESS_NFT ){

                const contractStaking = new ethers.Contract(
                    ADDRESS_STAKING,
                    ABI_STAKING,
                    signer,
                )

                let nftTxn = await contractStaking.withdraw(
                    token_id,
                    ADDRESS_NFT
                );
        
                console.log("Mining... please wait");
                await nftTxn.wait();
        
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

            }
            
            
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const approveStaking = createAsyncThunk(
    'staking/approveStaking',
    async (params:any, { dispatch, getState ,rejectWithValue}) => {

        const rootState = getState() as RootState;
        const  { easyWeb3 ,address} = rootState.wallet;

        const signer = easyWeb3.getSigner();

        const { token_id } = params;

        try {

            if(signer && token_id && ADDRESS_NFT ){

                const amountMax = 1000000000;

                const contractStaking = new ethers.Contract(
                    ADDRESS_NFT,
                    ABI_NFT,
                    signer,
                )

                let approveTxn = await contractStaking.approve(
                    ADDRESS_STAKING,
                    ethers.utils.formatUnits(amountMax.toString(),18)
                );
        
                console.log("Mining... please wait");
                await approveTxn.wait();
        
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${approveTxn.hash}`);

            }
            
            
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)