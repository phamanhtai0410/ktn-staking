import { useTranslation } from 'react-i18next'
import './index.scss'
import IcReferral from '../../assets/images/referral/ic_referral.svg'
import IcCopy from '../../assets/images/referral/ic_copy.svg'
import Pagination from '@/components/_partials/Pagination'
import { useEffect, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import classnames from 'classnames'
import { useAppDispatch } from '@/app/hooks'
import { useSelector } from 'react-redux'
import {
  selectLeaderBoard,
  selectLeaderBoardTop3,
  selectReferralCode,
} from '@/reducers/referral'
import {
  fetchListLeaderBoard,
  fetchListLeaderBoardTop3,
  fetchReferralCode,
  submitReferralCode,
} from '@/actions/referralActions'
import { addressWalletCompact, copyTextToClipboard } from '@/_helpers/utils/lib'
import { ILeaderBoardParams } from '@/models/referral-models'
import { LocalStorageService } from '@/_helpers'
import { useSearchParams } from 'react-router-dom'
import Top from '../_partials/Top'

const ReferralPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const referralCode = useSelector(selectReferralCode)
  const listLeaderBoard = useSelector(selectLeaderBoard)
  const listLeaderBoardTop3 = useSelector(selectLeaderBoardTop3)

  const [leaderBoardParams, setLeaderBoardParams] =
    useState<ILeaderBoardParams>({
      search: '',
      page: 1,
      page_size: 10,
      event: 'top_referral',
    })
  useEffect(() => {
    dispatch(
      fetchReferralCode({ address: LocalStorageService.getAccessAccount() }),
    )
    dispatch(fetchListLeaderBoard(leaderBoardParams))
    dispatch(fetchListLeaderBoardTop3(leaderBoardParams))
  }, [])

  const onCopyReferralCode = (value) => {
    copyTextToClipboard(value)
  }

  const onSubmitReferralCode = (e) => {
    e.preventDefault()
    let inputCode = e.target[0].value

    dispatch(
      submitReferralCode({
        address: LocalStorageService.getAccessAccount(),
        code: inputCode,
      }),
    )
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
  const [inputReferralCode, setInputReferralCode] = useState('')
  const [currentRow, setCurrentRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageChangeIncrease, setPageChangeIncrease] = useState(false)
  const [currentTableData, setCurrentTableData] = useState([])

  const onChangeReferralCode = (value) => {
    setInputReferralCode(value)
  }

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * leaderBoardParams.page_size
    // const lastPageIndex = firstPageIndex + leaderBoardParams.page_size
    setCurrentTableData(listLeaderBoard?.items)
  }, [currentPage, listLeaderBoard])

  useEffect(() => {
    setLeaderBoardParams({ ...leaderBoardParams, page: currentPage })
    dispatch(fetchListLeaderBoard({ ...leaderBoardParams, page: currentPage }))
  }, [currentPage])

  useEffect(() => {
    setInputReferralCode(searchParams.get('ref') || '')
  }, [searchParams])

  return (
    <section className="referral">
      <div className="referral__main pt-40 pb-12 relative flex flex-col items-center min-h-[1254px] sm:px-0 px-4">
        <div className="container">
          {referralCode && (
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
                      <img
                        src={IcCopy}
                        alt="referral"
                        className="cursor-pointer"
                        onClick={() => onCopyReferralCode(referralCode?.code)}
                      />
                      <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                        {referralCode?.code || '--'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                      Referral People:
                    </span>
                    <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                      {referralCode?.point ? referralCode.point : '--'}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                      Total Earned:
                    </span>
                    <span className="font-poppins font-bold text-xl text-[#FFA52C]">
                      {referralCode?.total_earn}
                    </span>
                  </div>
                </div>
                <div className="mt-[26px] mb-6 h-[1px] border border-dashed border-[#81715C]"></div>
                <div className="flex flex-col space-y-[10px]">
                  <span className="font-poppins font-medium text-base text-[#E2C1AA]">
                    Been referred by a friend?
                  </span>
                  <form
                    onSubmit={(event) => onSubmitReferralCode(event)}
                    className="flex flex-row w-full items-center space-x-4"
                  >
                    <input
                      className="w-full p-3 font-poppins font-medium text-base text-[#E2C1AA] placeholder:text-[#81715C] bg-white bg-opacity-10 rounded-lg focus:outline-none"
                      placeholder="Enter code"
                      value={inputReferralCode}
                      onChange={(e) => onChangeReferralCode(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={`px-4 py-3 font-poppins font-semibold text-base rounded-lg ${
                        inputReferralCode.length > 5
                          ? 'bg-[#FFA52C] text-white'
                          : 'bg-white bg-opacity-10 text-[#81715C]'
                      } `}
                      disabled={inputReferralCode.length < 6}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4 mt-8 w-full">
            <span className="font-oxanium font-bold text-2xl text-[#FFA52C]">
              List Top
            </span>
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
