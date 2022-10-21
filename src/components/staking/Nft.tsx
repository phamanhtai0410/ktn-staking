import React from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
import { selectStakingId } from '@/reducers/staking'
import { ClipLoader } from 'react-spinners'
import classNames from 'classnames'

const Nft = ({ data, onStake }) => {
  const stakingId = useSelector(selectStakingId)

  return (
    <div
      key={data?.token_id}
      className="partitals__nft px-[21.48px] py-6 flex flex-col space-y-4 text-white"
    >
      <img
        src={data?.image}
        alt="nft"
        className="h-[248px] object-cover object-top"
      />
      <span className="font-oxanium font-bold text-base text-white text-center min-h-[24px]">
        {data?.description}
      </span>
      <div className="flex flex-row items-center justify-between">
        <span className="font-poppins font-normal text-sm text-white">
          NFT ID
        </span>
        <span className="font-poppins font-normal text-sm text-[#FFA52C]">
          {data?.token_id}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="font-poppins font-normal text-sm text-white">
          Price
        </span>
        <span className="font-poppins font-bold text-xl text-[#FFA52C]">
          {data?.price}
        </span>
      </div>
      <button
        className={classNames(
          'flex flex-row items-center justify-center space-x-4 py-[10px] rounded-lg',
          { 'bg-[#4D4233]': data?.token_id === stakingId },
          { 'bg-white bg-opacity-5': data?.token_id !== stakingId },
          { ' hover:bg-[#4D4233]': !stakingId },
        )}
        disabled={stakingId ? true : false}
        onClick={() => {
          onStake(data?.token_id, data?.is_staking)
        }}
      >
        <span className="font-poppins font-medium text-base text-white text-center">
          {!data?.is_staking
            ? stakingId !== data?.token_id
              ? 'Stake'
              : 'Staking'
            : stakingId !== data?.token_id
            ? 'UnStake'
            : 'Unstaking'}
        </span>

        {stakingId === data?.token_id && (
          <ClipLoader
            color="white"
            size={17}
            loading={stakingId ? true : false}
          />
        )}
      </button>
    </div>
  )
}

export default Nft
