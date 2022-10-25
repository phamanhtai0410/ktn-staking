import { fetchUserRank, unStakeAll } from '@/actions/stakingActions'
import { useAppDispatch } from '@/app/hooks'
import { setAlert } from '@/reducers/alert'
import { selectMyNFTs } from '@/reducers/myNFTsSlice'
import { selectClaim, selectIsOpenModalClaim, selectIsPending, selectUserRank } from '@/reducers/staking'
import { selectWalletAccount } from '@/reducers/walletSlice'
import { randomKeyUUID } from '@/_helpers/utils/lib'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useClaimFacade = () => {
  const dispatch = useAppDispatch()
  const walletAccount = useSelector(selectWalletAccount)
  const isOpen = useSelector(selectIsOpenModalClaim)
  const userRank = useSelector(selectUserRank)
  const listMyNFTs = useSelector(selectMyNFTs)
  const isPending = useSelector(selectIsPending)
  const claim = useSelector(selectClaim)
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
  
  useEffect(() => {
    if (!claim?.isPending && claim?.status==="PENDING") {
      dispatch(
        setAlert({
          type: 'success',
          key: randomKeyUUID(),
          message: {
            status: 'success',
            title: 'Claimed successfully! Your request is pending now.',
          },
        }),
      )
      dispatch(fetchUserRank({ event: 'stake', search: walletAccount }))
    }
  }, [claim])

  return {
    isOpen,
    step,
    claimType,
    isClaiming,
    userRank,
    setClaimType,
    resetModal,
    nextStep,
    setStep,
  }
}

export default useClaimFacade
