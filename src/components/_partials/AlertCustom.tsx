import React from 'react'
import { ToastContainer, toast, ToastContentProps } from 'react-toastify'

import IcClose from '../../assets/images/toast/ic_close.svg'
// import IcSuccess from "../../assets/images/toast/success.svg";
// import IcComingSoon from "../../assets/images/toast/coming_soon.svg";
import IcWarning from '../../assets/images/toast/ic_warning.svg'
// import { TailSpin } from "react-loading-icons";
import { FadeLoader } from 'react-spinners'

import { useDispatch } from 'react-redux'
// import { openEditModal } from "../../reducers/user/profile.reducer";

const AlertCustom = ({ dataItem, status }) => {
  const Msg = ({ closeToast, toastProps }: Partial<ToastContentProps>) => {
    console.log('closeToast', closeToast)
    console.log('toastProps', toastProps)
    return <img src={IcClose} alt="" onClick={closeToast} />
  }
  // const { dataItem, closeToast, status } = props
  const { message, isLoading } = dataItem
  const dispatch = useDispatch()
  // const onUpdate = () => {
  //   dispatch(openEditModal());
  // };
  const loadIconView = (status) => {
    switch (status) {
      case 'success':
        return <img src={IcWarning} alt="Ic Success" />
      case 'info':
        return <img src={IcWarning} alt="IcComing" />
      case 'warning':
        return <img src={IcWarning} alt="Ic Warning" />
      case 'loading':
        return <FadeLoader color="#FFA540" />
      default:
        break
    }
  }

  return (
    <div className="flex flex-row items-start justify-between">
      <div className="flex flex-row items-start">
        {loadIconView(status)}
        <div className="flex flex-col pl-6 space-y-1">
          {message.title && (
            <span className="font-poppins font-semibold text-base text-[#FFA52C]">
              {message.title}
            </span>
          )}
          {message.description && (
            <span className="font-poppins font-normal text-sm text-white">
              {message.description}
            </span>
          )}
          {/* {message.details && (
            <a
              href={`https://explore-testnet.vechain.org/transactions/${message.details?.txid}`}
              target={"_blank"}
              rel="noopener noreferrer"
              className="font-poppins text-sm text-[#FA8C16]"
            >
              {message.details?.message}
            </a>
          )} */}
          {message?.details && message?.details?.label ? (
            <div>
              <p
                className={`text-[${
                  message?.details?.color ?? '#699B8C'
                }] text-[16px] underline font-montserrat_semi_bold ${
                  message?.details?.className
                }`}
                onClick={message?.details?.action}
              >
                {message?.details?.label}
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {(!isLoading || status === 'info') && (
        // <img src={IcClose} alt="" onClick={closeToast} />
        <Msg />
      )}
    </div>
  )
}

export default AlertCustom
