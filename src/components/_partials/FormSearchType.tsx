import React from 'react'
import IcArrow from '../../assets/images/partials/ic_arrow_bot.svg'
import './index.scss'

interface Props {
  index: string
  numOfPage: string
}

const FormSearchType = (Props) => {
  const { className, title, setNftType } = Props
  const onChangeSort = (e) => {
    setNftType(e.target.value)
  }
  return (
    <div className="flex flex-col relative w-[184px]">
      <select
        className="partitals__sort-price py-3 px-6 flex items-center cursor-pointer focus:outline-none appearance-none font-poppins font-normal text-base text-[#FFA52C]"
        defaultValue={'NFT'}
        onChange={onChangeSort}
      >
        <option
          value="NFT"
          className="font-poppins font-normal text-base text-[#FFA52C]"
        >
          NFT
        </option>
        <option
          value="BOX"
          className="font-poppins font-normal text-base text-[#FFA52C]"
        >
          BOX
        </option>
      </select>

      <img src={IcArrow} alt="rinz" className="absolute top-[40%] right-4" />
    </div>
  )
}

export default FormSearchType
