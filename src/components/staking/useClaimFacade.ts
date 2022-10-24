import { selectMyNFTs } from "@/reducers/myNFTsSlice";
import { selectIsOpenModalClaim, selectUserRank } from "@/reducers/staking";
import { selectWalletAccount } from "@/reducers/walletSlice";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useClaimFacade = () => {
  const dispatch = useDispatch();
  const walletAccount = useSelector(selectWalletAccount)
  const isOpen = useSelector(selectIsOpenModalClaim)
  const userRank = useSelector(selectUserRank)
  const listMyNFTs = useSelector(selectMyNFTs)
  const [step, setStep] = useState(1);
  const [claimType, setClaimType] = useState("USDT");
  const [isClaiming, setIsClaiming] = useState(true);

  const nextStep = () => {
    if (step===1 && !checkStaked()) {
      setStep(step + 3);
    }
    else {
      setStep(step + 1);
    }
  };

  const checkStaked = () => {
    let flag = false;
    listMyNFTs?.map((item)=>{
      if (item.is_staking) {
        flag = true;
      }
    })
    return flag
  };

  const resetModal = () => {
    setStep(1);
    setClaimType("USDT");
    setIsClaiming(true)
  };

  useEffect(() => {
    if (step === 1 || step === 2) {
    }
    if (step === 3) {
      setTimeout(() => {
        setIsClaiming(false)
      }, 1500);
    }
    if (step === 4) {
    }
    if (step === 5) {
      // closeModal();
    }
  }, [step]);

  return {
    isOpen,
    step,
    claimType,
    isClaiming,
    userRank,
    setClaimType,
    resetModal,
    nextStep,
  };
};

export default useClaimFacade;
