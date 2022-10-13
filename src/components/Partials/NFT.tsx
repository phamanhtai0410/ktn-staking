import React from 'react'
import './index.scss'
import IcArrow from '../../assets/images/partials/ic_arrow_bot.svg'

const NFT = ({ data }) => {
  const { title, id, price, img } = data
  return (
    <div className="partitals__nft px-[21.48px] py-6 flex flex-col space-y-4 text-white">
      <img src={img} alt="nft" />
      <span className="font-oxanium font-bold text-base text-white text-center">
        {title}
      </span>
      <div className="flex flex-row items-center justify-between">
        <span className="font-poppins font-normal text-sm text-white">
          NFT ID
        </span>
        <span className="font-poppins font-normal text-sm text-[#FFA52C]">
          {id}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="font-poppins font-normal text-sm text-white">
          Price
        </span>
        <span className="font-poppins font-bold text-xl text-[#FFA52C]">
          {price}
        </span>
      </div>
      <button className="btn-stake py-[10px] font-poppins font-medium text-base text-white text-center">
        Stake
      </button>
    </div>
  )
}

export default NFT
