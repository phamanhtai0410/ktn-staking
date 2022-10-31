import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsPending } from '@/reducers/staking'
import { ClipLoader } from 'react-spinners'
import classNames from 'classnames'
import { useAppDispatch } from '@/app/hooks'
import { approveStaking, unStakeNFT } from '@/actions/stakingActions'
import { selectEasyWeb3 } from '@/reducers/walletSlice'
import { EasyWeb3, useEasyWeb3 } from '@/service/web3'

const BtnStake = ({ data }) => {
  const dispatch = useAppDispatch()
  const isPending = useSelector(selectIsPending)
  const easyWeb3Data = useSelector(selectEasyWeb3)
  const [isOnClick, setIsOnClick] = useState(false)

  const onStake = async (token_id, is_staking) => {
    let acceptChain: number = import.meta.env.VITE_CHAIN_ID
    if (acceptChain !== easyWeb3Data?.walletInfo?.chainId) {
      const result = await EasyWeb3.getInstance().switchEthereumCChain(
        acceptChain,
      )
      if (result !== undefined) {
        if (!is_staking) {
          dispatch(approveStaking({ token_id: token_id }))
        } else {
          dispatch(unStakeNFT({ token_id: token_id }))
        }
      } else setIsOnClick(false)
    }
  }

  useEffect(() => {
    if (!isPending) {
      setIsOnClick(false)
    }
  }, [isPending])

  return (
    <button
      className={classNames(
        'flex flex-row items-center justify-center space-x-4 py-[10px] rounded-lg',
        { 'bg-[#4D4233]': isOnClick },
        { 'bg-white bg-opacity-5': !isOnClick },
        { 'hover:bg-[#4D4233]': !isPending },
      )}
      disabled={isPending}
      onClick={() => {
        setIsOnClick(true)
        onStake(data?.token_id, data?.is_staking)
      }}
    >
      <span className="font-poppins font-medium text-base text-white text-center">
        {!data?.is_staking
          ? !isOnClick
            ? 'Stake'
            : 'Staking'
          : !isOnClick
          ? 'UnStake'
          : 'Unstaking'}
      </span>

      {isPending && isOnClick && <ClipLoader color="white" size={17} />}
    </button>
  )
}

export default BtnStake
