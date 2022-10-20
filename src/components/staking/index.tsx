import { useTranslation } from 'react-i18next'
import './index.scss'
import IcRank from '../../assets/images/staking/ic_rank.svg'
import IcStaked from '../../assets/images/staking/ic_staked.svg'
import IcLock from '../../assets/images/staking/ic_lock.svg'
import IcTop1 from '../../assets/images/staking/ic_top1.svg'
import IcTop2 from '../../assets/images/staking/ic_top2.svg'
import IcTop3 from '../../assets/images/staking/ic_top3.svg'
import nft1 from '../../assets/images/partials/nft1.png'
import nft2 from '../../assets/images/partials/nft2.png'
import nft3 from '../../assets/images/partials/nft3.png'
import nft4 from '../../assets/images/partials/nft4.png'
import nft5 from '../../assets/images/partials/nft5.png'
import nft6 from '../../assets/images/partials/nft6.png'
import nft7 from '../../assets/images/partials/nft7.png'
import nft8 from '../../assets/images/partials/nft8.png'
import Pagination from '@/components/_partials/Pagination'
import FormSearchPrice from '../_partials/FormSearchPrice'
import FormSearchToken from '../_partials/FormSearchToken'
import NFT from '../_partials/NFT'
import { useAppDispatch } from '@/app/hooks'
import {
  fetchListLeaderBoard,
  fetchListLeaderBoardTop3,
  fetchListMyNFTs,
  stakeNFT,
} from '@/actions/stakingActions'
import { useEffect, useMemo, useState } from 'react'
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import {
  selectLeaderBoard,
  selectLeaderBoardTop3,
} from '@/reducers/LeaderBoardSlice'
import { LocalStorageService } from '@/_helpers'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import { openModalClaim } from '@/reducers/referral'
import ModalClaim from './ModalClaim'
import { selectWalletAccount } from '@/reducers/walletSlice'
import classNames from 'classnames'
import Top from '../_partials/Top'
import { useSearchParams } from 'react-router-dom'
import { ILeaderBoardParams } from '@/models/referral-models'
import {
  addressWalletCompact,
  copyTextToClipboard,
  randomKeyUUID,
} from '@/_helpers/utils/lib'
import { setAlert } from '@/reducers/alert'

const StakingPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const listMyNFTs = useSelector(selectMyNFTs)
  const [searchParams, setSearchParams] = useSearchParams()
  const listLeaderBoard = useSelector(selectLeaderBoard)
  const listLeaderBoardTop3 = useSelector(selectLeaderBoardTop3)

  const [leaderBoardParams, setLeaderBoardParams] =
    useState<ILeaderBoardParams>({
      search: '',
      page: 1,
      page_size: 10,
      event: 'stake',
    })

  useEffect(() => {
    dispatch(fetchListLeaderBoard(leaderBoardParams))
    dispatch(fetchListLeaderBoardTop3(leaderBoardParams))
  }, [])

  const onCopyReferralCode = (value) => {
    copyTextToClipboard(value)
    dispatch(
      setAlert({
        type: 'success',
        key: randomKeyUUID(),
        duration: 10,
        message: {
          status: 'info',
          title: 'Coming soon',
          description: `We are in progress to complete this function`,
        },
      }),
    )
  }

  useEffect(() => {
    dispatch(fetchListMyNFTs({ address: walletAccount }))
  }, [walletAccount])
  useEffect(() => {
    console.log('listMyNFTs', listMyNFTs)
  }, [listMyNFTs])

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
  const tableData = [
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
    {
      rank: 1,
      address: '0x' + makeid(4) + '...' + makeid(5),
      point: makeNumber(7),
    },
  ]
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

  let PageSize = 10
  const [currentRow, setCurrentRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageChangeIncrease, setPageChangeIncrease] = useState(false)
  const [currentTableData, setCurrentTableData] = useState([])
  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    setCurrentTableData(tableData.slice(firstPageIndex, lastPageIndex))
  }, [currentPage])

  const onClickClaim = () => {
    dispatch(openModalClaim({ isOpen: true }))
  }

  const onStake = (token_id) => {
    console.log('token_id', token_id)
    dispatch(stakeNFT({ token_id: 1 }))
  }

  return (
    <section className="staking">
      <div className="staking__main pt-40 pb-12 relative flex flex-col items-center min-h-[1254px] sm:px-0 px-4">
        <div className="container">
          <div className="flex flex-col w-full space-y-4 max-w-[1280px]">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              Stake
            </span>
            <div className="grid lg:grid-cols-2 grid-cols-1 w-full items-center sm:gap-x-8 gap-y-8">
              <div className="flex flex-col h-[208px] space-y-8 border border-[#FFA52C] rounded-2xl backdrop-blur-[25px] p-8 pb-12">
                <div className="flex flex-row items-center space-x-4">
                  <img src={IcRank} alt="staking" />
                  <span className="font-oxanium_ font-bold text-4xl text-white">
                    My Rank
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <span className="font-poppins font-bold text-xl text-white">
                    Rank -
                  </span>
                  <span className="font-poppins font-bold text-xl text-white">
                    Point: 0
                  </span>
                  <button
                    // className="px-4 py-3 bg-[#FFA52C] rounded-lg font-poppins font-bold text-base text-white"
                    className={classNames(
                      'px-4 py-3 rounded-lg font-poppins font-bold text-base',
                      { 'bg-[#FFA52C] text-white': walletAccount },
                      { 'bg-[#4D4233] text-[#806B4F]': !walletAccount },
                    )}
                    disabled={!walletAccount}
                    onClick={() => {
                      onClickClaim()
                    }}
                  >
                    Claim
                  </button>
                </div>
              </div>
              <div className="flex flex-col h-[208px] space-y-8 border border-[#FFA52C] rounded-2xl backdrop-blur-[25px] p-8 pb-12">
                <div className="flex flex-row space-x-4">
                  <img src={IcStaked} alt="staking" />
                  <span className="font-oxanium_ font-bold text-4xl text-white">
                    Total Staked
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row space-x-2">
                    <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                      0
                    </span>
                    <span className="font-poppins font-bold text-xl text-white">
                      KATA
                    </span>
                  </div>

                  <img src={IcLock} alt="staking" />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col space-y-4 mt-8 w-full">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              List Top
            </span>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col items-center">
                <div className="grid lg:grid-cols-3 grid-cols-1 pl-[18px] items-center mt-4 gap-x-20 gap-y-12">
                  <div className="staking__top relative w-[304px] flex flex-col items-center py-2 space-y-2 ">
                    <span className="font-poppins font-semibold text-base text-[#FFB156]">
                      0x5d07...eba9
                    </span>
                    <span className="font-poppins font-semibold text-base text-white">
                      Point: 3851300
                    </span>
                    <img
                      src={IcTop1}
                      alt="staking"
                      className="absolute top-[-25%] left-[-36px]"
                    />
                  </div>
                  <div className="staking__top relative w-[304px] flex flex-col items-center py-2 space-y-2 ">
                    <span className="font-poppins font-semibold text-base text-[#FFB156]">
                      0x5d07...eba9
                    </span>
                    <span className="font-poppins font-semibold text-base text-white">
                      Point: 3851300
                    </span>
                    <img
                      src={IcTop2}
                      alt="staking"
                      className="absolute top-[-25%] left-[-36px]"
                    />
                  </div>
                  <div className="staking__top relative w-[304px] flex flex-col items-center py-2 space-y-2 ">
                    <span className="font-poppins font-semibold text-base text-[#FFB156]">
                      0x5d07...eba9
                    </span>
                    <span className="font-poppins font-semibold text-base text-white">
                      Point: 3851300
                    </span>
                    <img
                      src={IcTop3}
                      alt="staking"
                      className="absolute top-[-25%] left-[-36px]"
                    />
                  </div>
                </div>
              </div>
              <div className="staking__table flex flex-col overflow-hidden">
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
                {currentTableData.map((item, index) => (
                  <TransitionGroup>
                    <SwitchTransition mode={'out-in'}>
                      <CSSTransition
                        key={PageSize * (currentPage - 1) + index + 1}
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
                            {PageSize * (currentPage - 1) + index + 1}
                          </span>
                          <span className="font-poppins font-normal text-base text-white text-center">
                            {item.address}
                          </span>
                          <span className="font-poppins font-normal text-base text-white text-center">
                            {item.point}
                          </span>
                        </div>
                      </CSSTransition>
                    </SwitchTransition>
                  </TransitionGroup>
                ))}
                <div className="flex w-full items-center justify-center pt-8">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={tableData.length}
                    pageSize={PageSize}
                    onPageChange={(page) => {
                      setCurrentRow(0)
                      setPageChangeIncrease(page > currentPage)
                      setCurrentPage(page)
                    }}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex flex-col space-y-4 mt-8 w-full">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              List Top
            </span>
            {listLeaderBoard &&
            listLeaderBoard?.items &&
            listLeaderBoard?.items?.length > 0 ? (
              <div className="flex flex-col space-y-8">
                <div className="flex flex-col items-center">
                  <div
                    className={`grid lg:grid-cols-${listLeaderBoardTop3?.items?.length} grid-cols-1 pl-[18px] items-center mt-4 gap-x-20 gap-y-12`}
                  >
                    {listLeaderBoardTop3 &&
                      listLeaderBoardTop3?.items?.map((item, index) => (
                        <Top key={index} item={item} />
                      ))}
                  </div>
                </div>
                {listLeaderBoard &&
                  listLeaderBoard?.items &&
                  listLeaderBoard?.items?.length > 0 && (
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
                        <SwitchTransition key={index} mode={'out-in'}>
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
                          numOfPage={listLeaderBoard?.num_of_page}
                          // totalCount={listLeaderBoard?.num_of_page}
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
            ) : (
              <span className="font-poppins font-semibold text-base text-center text-[#FFB156]">
                No data found!
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-4 mt-8 w-full">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              Information
            </span>
            <div className="grid md:grid-cols-2 grid-cols-1 w-full items-center gap-8">
              <div className="staking__information p-6">
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
                <table className="staking__information__table w-full xl:p-4">
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

          <div className="flex flex-col space-y-4 mt-8 w-full">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              NFTs
            </span>
            <div className="flex flex-row space-x-6">
              <FormSearchPrice />
              <FormSearchToken />
            </div>
            {listMyNFTs && listMyNFTs.length > 0 ? (
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-8">
                {listMyNFTs.map((item) => (
                  <NFT data={item} onStake={onStake} />
                ))}
              </div>
            ) : (
              <span className="font-poppins font-semibold text-base text-center text-[#FFB156]">
                No data found!
              </span>
            )}
          </div>
        </div>
      </div>
      <ModalClaim />
    </section>
  )
}
export default StakingPage
