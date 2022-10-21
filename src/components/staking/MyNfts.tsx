import FormSearchPrice from '../_partials/FormSearchPrice'
import FormSearchToken from '../_partials/FormSearchToken'
import { useAppDispatch } from '@/app/hooks'
import { approveStaking, unStakeNFT } from '@/actions/stakingActions'
import { useSelector } from 'react-redux'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import Nft from './Nft'

const MyNfts = ({ data }) => {
  const dispatch = useAppDispatch()
  const listMyNFTs = useSelector(selectMyNFTs)
  const onStake = (token_id, is_staking) => {
    if (!is_staking) {
      dispatch(approveStaking({ token_id: token_id }))
    } else {
      dispatch(unStakeNFT({ token_id: token_id }))
    }
  }
  return (
    <div className="flex flex-col space-y-4 mt-8 w-full">
      <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
        NFTs
      </span>
      <div className="flex flex-row space-x-6">
        <FormSearchPrice />
        <FormSearchToken />
      </div>
      {data && data.length > 0 ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-8">
          {listMyNFTs.map((item) => (
            <Nft data={item} onStake={onStake} />
          ))}
        </div>
      ) : (
        <span className="font-poppins font-semibold text-base text-center text-[#FFB156]">
          No data found!
        </span>
      )}
    </div>
  )
}
export default MyNfts
