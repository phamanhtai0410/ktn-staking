import { selectIsOpenModalClaim } from "@/reducers/referral";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useClaimFacade = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModalClaim)
  // const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [claimType, setClaimType] = useState("");
  const [claiming, setClaiming] = useState(true);

  const nextStep = () => {
    setStep(step + 1);
  };

  const resetModal = () => {
    setStep(1);
    setClaimType("");
    setClaiming(true)
  };

  useEffect(() => {
    if (step === 1 || step === 2) {
    }
    if (step === 3) {
      setTimeout(() => {
        setClaiming(false)
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
    claiming,
    setClaimType,
    resetModal,
    nextStep,
  };
};

export default useClaimFacade;
