import { unStakeAll } from '@/actions/stakingActions'
import { useAppDispatch } from '@/app/hooks'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import { selectIsOpenModalClaim, selectIsPending, selectUserRank } from '@/reducers/staking'
import { selectWalletAccount } from '@/reducers/walletSlice'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

const useClaimFacade = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const isOpen = useSelector(selectIsOpenModalClaim)
  const userRank = useSelector(selectUserRank)
  const listMyNFTs = useSelector(selectMyNFTs)
  const isPending = useSelector(selectIsPending)
  const [step, setStep] = useState(1)
  const [claimType, setClaimType] = useState('USDT')
  const [isClaiming, setIsClaiming] = useState(false)

  const nextStep = () => {
    if (step === 1 && !checkStaked()) {
      setStep(step + 3)
    } else {
      setStep(step + 1)
    }
  }

  const checkStaked = () => {
    let flag = false
    listMyNFTs?.items?.map((item) => {
      if (item.is_staking) {
        flag = true
      }
    })
    return flag
  }

  const resetModal = () => {
    setStep(1)
    setClaimType('USDT')
    setIsClaiming(false)
  }

  useEffect(() => {
    if (step === 1 || step === 2) {
    }
    if (step === 3) {
      setIsClaiming(true)
      dispatch(unStakeAll())
      setIsClaiming(false)
    }
    if (step === 4) {
    }
    if (step === 5) {
      // closeModal();
    }
  }, [step])

  useEffect(() => {
    setIsClaiming(isPending)
    if (step===3 && !isPending) {
      nextStep()
    }
  }, [isPending])
  

  return {
    isOpen,
    step,
    claimType,
    isClaiming,
    userRank,
    setClaimType,
    resetModal,
    nextStep,
  }
}

export default useClaimFacade
