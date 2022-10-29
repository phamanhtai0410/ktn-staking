import FormSearchPrice from '../_partials/FormSearchPrice'
import FormSearchToken from '../_partials/FormSearchToken'
import { useAppDispatch } from '@/app/hooks'
import {
  approveStaking,
  fetchListMyNFTs,
  unStakeNFT,
} from '@/actions/stakingActions'
import { useSelector } from 'react-redux'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import Nft from './Nft'
import Pagination from '../_partials/Pagination'
import { useEffect, useState } from 'react'
import { selectWalletAccount } from '@/reducers/walletSlice'
import circle1 from '../../assets/images/staking/circle1.png'
import circle2 from '../../assets/images/staking/circle2.png'
import char from '../../assets/images/staking/char.png'

const page_size = 8

const MyNfts = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const listMyNFTs = useSelector(selectMyNFTs)

  const onStake = (token_id, is_staking) => {
    if (!is_staking) {
      dispatch(approveStaking({ token_id: token_id }))
    } else {
      dispatch(unStakeNFT({ token_id: token_id }))
    }
  }

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (walletAccount) {
      dispatch(
        fetchListMyNFTs({
          page: currentPage,
          page_size: page_size,
          address: walletAccount,
        }),
      )
    } else {
      setCurrentPage(1)
    }
  }, [walletAccount, currentPage])

  return (
    <div className="flex flex-col space-y-4 mt-8 w-full">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        NFTs
      </span>
      <div className="flex flex-row space-x-6">
        <FormSearchPrice />
        <FormSearchToken />
      </div>
      {walletAccount && listMyNFTs && listMyNFTs?.items?.length > 0 ? (
        <div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-8">
            {listMyNFTs?.items?.map((item, index) => (
              <Nft key={index} data={item} onStake={onStake} />
            ))}
          </div>
          <div className="flex w-full items-center justify-center pt-8">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={listMyNFTs?.pagination?.num_of_page}
              pageSize={listMyNFTs?.pagination?.page_size}
              onPageChange={(page) => {
                setCurrentPage(page)
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center space-y-8">
          <div className="relative xl:mt-[72px] mt-12 w-[363px] h-[363px] overflow-visible">
            <img
              src={circle1}
              alt="cart"
              className="staking__circle-move-reverse absolute top-[-2px] p-[1px] w-full mix-blend-screen rounded-full"
            />
            <img
              src={circle2}
              alt="cart"
              className="staking__circle-move absolute top-0 left-0 w-full rounded-full"
            />
            <img
              src={char}
              alt="cart"
              className="absolute w-[451px] h-[369px]"
            />
            <div className="absolute opacity-[0.3] shadow-[1px_1px_100px_#fff] w-full h-full rounded-full"></div>
          </div>
          <span className="font-oxanium font-semibold text-2xl text-[#FFA52C] tracking-[10px]">
            NO DATA AVAILABLE !
          </span>
        </div>
      )}
    </div>
  )
}
export default MyNfts
