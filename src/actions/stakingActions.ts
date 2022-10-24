import { createAsyncThunk } from '@reduxjs/toolkit'
import { ethers, FixedNumber } from 'ethers'

import { RootState } from '@/reducers/rootReducer'
import { stakingService } from "@/service/staking.service"

import ABI_STAKING from '@/_contract/ABI_STAKING_V3.json';
import ABI_NFT from '@/_contract/ABI_NFT_V7.json';

import { setAlert } from '@/reducers/alert';
import { randomKeyUUID } from '@/_helpers/utils/lib';
// const ADDRESS_STAKING = "0x7dd5b9e30c65fADCE34454d3bBa0eDF696D1b10d";
const ADDRESS_STAKING = "0x71A3620765570899dD7Bf28E9eA68C17C0874208";
const ADDRESS_NFT = "0x7059a9f1dA0b8838FB6f1c1dFc737C97d9ad8B5e"
  
export const fetchUserRank = createAsyncThunk(
    'staking/fetchUserRank',
    async (params:any, { dispatch, getState }) => {
        const response = await stakingService.getListLeaderBoard(params)
        return response.data
    }
)

export const fetchTotalStaked = createAsyncThunk(
    'staking/fetchTotalStaked',
    async (params:any, { dispatch, getState }) => {
        const response = await stakingService.getTotalStaked(params)
        return response.data
    }
)

export const fetchListLeaderBoard = createAsyncThunk(
    'staking/fetchLeaderBoard',
    async (params:any, { dispatch, getState }) => {
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
                if (nftTxn?.hash) {
                    dispatch(
                        setAlert({
                          type: 'success',
                          key: randomKeyUUID(),
                          message: {
                            status: 'success',
                            title: 'Staked successfully!',
                          },
                        }),
                      )
                }
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

                if (nftTxn?.hash) {
                    dispatch(
                        setAlert({
                          type: 'success',
                          key: randomKeyUUID(),
                          message: {
                            status: 'success',
                            title: 'Unstaked successfully!',
                          },
                        }),
                      )
                }
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
                const amountMax = FixedNumber.from(1000000000)

                const contractStaking = new ethers.Contract(
                    ADDRESS_NFT,
                    ABI_NFT,
                    signer,
                )
                let isApproved = await contractStaking.getApproved(
                    token_id
                );
                // if (isApproved==="0x0000000000000000000000000000000000000000") {
                //     alert("This NFT is staked!")
                //     return;
                // }
                let approveTxn = await contractStaking.approve(
                    ADDRESS_STAKING,
                    token_id
                );
        
                console.log("Mining... please wait");
                await approveTxn.wait();
                if (approveTxn?.hash) {
                    dispatch(stakeNFT({ token_id: token_id }))
                }    
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${approveTxn.hash}`);
            }
            
            
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const unStakeAll = createAsyncThunk(
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

                let nftsTxn = await contractStaking.unstakeAll(
                    ADDRESS_NFT
                );
                
                console.log("Mining... please wait");
                await nftsTxn.wait();
                console.log("nftsTxn", nftsTxn);
                if (nftsTxn?.hash) {
                    dispatch(
                        setAlert({
                          type: 'success',
                          key: randomKeyUUID(),
                          message: {
                            status: 'success',
                            title: 'Unstaked all successfully!',
                          },
                        }),
                      )
                }
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftsTxn.hash}`);

            }
            
            
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)