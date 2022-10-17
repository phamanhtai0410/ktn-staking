import { useTranslation } from 'react-i18next'
import './index.scss'
import IcReferral from '../../assets/images/referral/ic_referral.svg'
import IcCopy from '../../assets/images/referral/ic_copy.svg'
import IcTop1 from '../../assets/images/staking/ic_top1.svg'
import IcTop2 from '../../assets/images/staking/ic_top2.svg'
import IcTop3 from '../../assets/images/staking/ic_top3.svg'
import Pagination from '@/components/partials/Pagination'
import { useEffect, useState } from 'react'
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group'
import classnames from 'classnames'
import { useAppDispatch } from '@/app/hooks'
import { useSelector } from 'react-redux'
import { selectLeaderBoard, selectLeaderBoardTop3 } from '@/reducers/referral'
import {
  fetchListLeaderBoard,
  fetchListLeaderBoardTop3,
} from '@/actions/referralActions'
import { addressWalletCompact } from '@/_helpers/utils/lib'

const ReferralPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const listLeaderBoard = useSelector(selectLeaderBoard)
  const listLeaderBoardTop3 = useSelector(selectLeaderBoardTop3)

  useEffect(() => {
    dispatch(fetchListLeaderBoard(leaderBoardParams))
    dispatch(fetchListLeaderBoardTop3(leaderBoardParams))
  }, [])

  const makeid = (length) => {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  const makeNumber = (length) => {
    var result = ''
    var characters = '0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  const getIconListTop = (rank) => {
    switch (rank) {
      case 1:
        return IcTop1
      case 2:
        return IcTop2
      case 3:
        return IcTop3
      default:
        break
    }
  }

  const tableHead = [
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[10%] py-[10px]',
      name: '#',
    },
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[20%]',
      name: 'Land Rarity',
    },
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[50%]',
      name: 'Number of people can buy',
    },
    {
      className:
        'font-poppins font-semibold text-base text-white text-center w-[20%]',
      name: 'Total residents',
    },
  ]
  const tableBody = [
    { id: 'Tier 1', rarity: 'Epic', no: '4', total: '400' },
    { id: 'Tier 2', rarity: 'Rare', no: '6', total: '240' },
    { id: 'Tier 3', rarity: 'Common', no: '20', total: '700' },
    { id: 'Tier 4', rarity: 'Common', no: '6', total: '200' },
  ]

  const [leaderBoardParams, setLeaderBoardParams] = useState({
    page: 1,
    page_size: 10,
    event: 'top_referral',
  })
  const [currentRow, setCurrentRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageChangeIncrease, setPageChangeIncrease] = useState(false)
  const [currentTableData, setCurrentTableData] = useState([])
  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * leaderBoardParams.page_size
    const lastPageIndex = firstPageIndex + leaderBoardParams.page_size
    setCurrentTableData(listLeaderBoard?.slice(firstPageIndex, lastPageIndex))
  }, [currentPage, listLeaderBoard])

  useEffect(() => {
    setLeaderBoardParams({ ...leaderBoardParams, page: currentPage })
  }, [currentPage])

  return (
    <section className="referral">
      <div className="referral__main pt-40 pb-12 relative flex flex-col items-center min-h-[1254px] sm:px-0 px-4">
        <div className="container">
          <div className="flex flex-col w-full space-y-4 max-w-[1280px]">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              Referral
            </span>
            <div className=" referral__head flex flex-col p-8 border-[0.5px] border-[#FFA52C] rounded-2xl backdrop-blur-[25px]">
              <div className="flex flex-row space-x-4">
                <img
                  src={IcReferral}
                  alt="referral"
                  className="cursor-pointer"
                />
                <span className="font-oxanium font-bold text-4xl text-white">
                  Referral
                </span>
              </div>
              <div className="flex flex-col mt-7 space-y-7">
                <div className="flex flex-row items-center justify-between">
                  <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                    My referral code:
                  </span>
                  <div className="flex flex-row items-center space-x-4">
                    <img src={IcCopy} alt="referral" />
                    <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                      26757874
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                    Referral People:
                  </span>
                  <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                    7874
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                    Total Earned:
                  </span>
                  <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                    $ 1,100,222
                  </span>
                </div>
              </div>
              <div className="mt-[26px] mb-6 h-[1px] border border-dashed border-[#81715C]"></div>
              <div className="flex flex-col space-y-[10px]">
                <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                  Been referred by a friend?
                </span>
                <div className="flex flex-row w-full items-center space-x-4">
                  <input
                    className="w-full p-3 font-poppins font-medium text-base text-[#E2C1AA] placeholder:text-[#81715C] bg-white bg-opacity-10 rounded-lg focus:outline-none"
                    placeholder="Enter code"
                  />
                  <button className="px-4 py-3 bg-white bg-opacity-10 font-poppins font-semibold text-base text-[#81715C] rounded-lg">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-8 w-full">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              List Top
            </span>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col items-center">
                <div
                  className={`grid lg:grid-cols-${listLeaderBoardTop3?.length} grid-cols-1 pl-[18px] items-center mt-4 gap-x-20 gap-y-12`}
                >
                  {listLeaderBoardTop3 &&
                    listLeaderBoardTop3?.map((item, index) => (
                      <div className="referral__top relative w-[304px] flex flex-col items-center py-2 space-y-2 ">
                        <span className="font-poppins font-semibold text-base text-[#FFB156]">
                          {addressWalletCompact(item.address)}
                        </span>
                        <span className="font-poppins font-semibold text-base text-white">
                          Point: {item.point}
                        </span>
                        <img
                          // src={`IcTop${index + 1}`}
                          src={getIconListTop(item.rank)}
                          alt="referral"
                          className="absolute top-[-25%] left-[-36px]"
                        />
                      </div>
                    ))}
                  {/* <div className="referral__top relative w-[304px] flex flex-col items-center py-2 space-y-2 ">
                    <span className="font-poppins font-semibold text-base text-[#FFB156]">
                      0x5d07...eba9
                    </span>
                    <span className="font-poppins font-semibold text-base text-white">
                      Point: 3851300
                    </span>
                    <img
                      src={IcTop1}
                      alt="referral"
                      className="absolute top-[-25%] left-[-36px]"
                    />
                  </div>
                  <div className="referral__top relative w-[304px] flex flex-col items-center py-2 space-y-2 ">
                    <span className="font-poppins font-semibold text-base text-[#FFB156]">
                      0x5d07...eba9
                    </span>
                    <span className="font-poppins font-semibold text-base text-white">
                      Point: 3851300
                    </span>
                    <img
                      src={IcTop2}
                      alt="referral"
                      className="absolute top-[-25%] left-[-36px]"
                    />
                  </div>
                  <div className="referral__top relative w-[304px] flex flex-col items-center py-2 space-y-2 ">
                    <span className="font-poppins font-semibold text-base text-[#FFB156]">
                      0x5d07...eba9
                    </span>
                    <span className="font-poppins font-semibold text-base text-white">
                      Point: 3851300
                    </span>
                    <img
                      src={IcTop3}
                      alt="referral"
                      className="absolute top-[-25%] left-[-36px]"
                    />
                  </div> */}
                </div>
              </div>
              {listLeaderBoard && listLeaderBoard?.length > 0 && (
                <div className="referral__table flex flex-col overflow-hidden">
                  <div className="grid grid-cols-3 items-center justify-between py-6 border-b border-white border-opacity-10">
                    <span className="font-oxanium font-bold text-2xl text-white text-center">
                      Rank
                    </span>
                    <span className="font-oxanium font-bold text-2xl text-white text-center">
                      Wallet Address
                    </span>
                    <span className="font-oxanium font-bold text-2xl text-white text-center">
                      Point
                    </span>
                  </div>
                  {currentTableData?.map((item, index) => (
                    <SwitchTransition
                      key={
                        leaderBoardParams.page_size * (currentPage - 1) +
                        index +
                        1
                      }
                      mode={'out-in'}
                    >
                      <CSSTransition
                        key={
                          leaderBoardParams.page_size * (currentPage - 1) +
                          index +
                          1
                        }
                        timeout={100 + index * 40}
                        classNames={classnames({
                          'table-row-item-left': !pageChangeIncrease,
                          'table-row-item-right': pageChangeIncrease,
                        })}
                      >
                        <div
                          className={classnames(
                            'grid grid-cols-3 items-center justify-between py-5 border-b border-white border-opacity-10 cursor-pointer',
                            {
                              'bg-[#FFA52C] bg-opacity-10':
                                index === currentRow,
                            },
                          )}
                          onClick={() => setCurrentRow(index)}
                        >
                          <span className="font-poppins font-normal text-base text-white text-center">
                            {item.rank}
                          </span>
                          <span className="font-poppins font-normal text-base text-white text-center">
                            {addressWalletCompact(item.address)}
                          </span>
                          <span className="font-poppins font-normal text-base text-white text-center">
                            {item.point}
                          </span>
                        </div>
                      </CSSTransition>
                    </SwitchTransition>
                  ))}
                  <div className="flex w-full items-center justify-center pt-8">
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={listLeaderBoard?.length}
                      pageSize={leaderBoardParams.page_size}
                      onPageChange={(page) => {
                        setCurrentRow(0)
                        setPageChangeIncrease(page > currentPage)
                        setCurrentPage(page)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-8 w-full">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              Rule
            </span>
            <div className="grid md:grid-cols-2 grid-cols-1 w-full items-center gap-8">
              <div className="referral__information p-6">
                <ul className=" ml-4">
                  <li className="font-poppins font-medium text-base text-white list-disc">
                    Users will stake MSP Tokens in exchange for points and have
                    a top point ranking to get the right to buy Lands.
                  </li>
                  <li className="font-poppins font-medium text-base text-white list-disc">
                    Each 100 MSP for 1 hour get 10 points.
                  </li>
                  <li className="font-poppins font-medium text-base text-white list-disc">
                    Top 25 will buy Lands.
                  </li>
                  <li className="font-poppins font-medium text-base text-white list-disc">
                    Users who have more than 1000 points but are not at the top
                    will be randomly selected 5 people to buy 1 Common Lands
                  </li>
                  <li className="font-poppins font-medium text-base text-white list-disc">
                    After all people on the whitelist have purchased, the
                    remaining Lands will be sold to those who come first, and
                    will end as soon as all Lands are sold out, each person only
                    can buy 1 Land
                  </li>
                </ul>
              </div>
              <div className="border-[0.5px] border-[#353A45] rounded-xl overflow-hidden">
                <table className="referral__information__table w-full xl:p-4">
                  <thead>
                    <tr>
                      {tableHead.map((item, index) => (
                        <th key={index} className={item.className}>
                          {item.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableBody &&
                      tableBody?.map((item, index) => (
                        <tr key={index} className="border_style">
                          <td className="font-poppins font-medium text-white text-base text-center py-[15.5px]">
                            {item.id}
                          </td>
                          <td className="font-poppins font-medium text-white text-base text-center">
                            {item.rarity}
                          </td>
                          <td className="font-poppins font-medium text-white text-base text-center">
                            {item.no}
                          </td>
                          <td className="font-poppins font-medium text-white text-base text-center">
                            {item.total}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ReferralPage
