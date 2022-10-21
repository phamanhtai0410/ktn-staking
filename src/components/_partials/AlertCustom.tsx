import React from 'react'
import { ToastContainer, toast, ToastContentProps } from 'react-toastify'

import IcClose from '../../assets/images/toast/ic_close.svg'
import IcInfo from '../../assets/images/toast/ic_info.svg'
import IcSuccess from '../../assets/images/toast/ic_success.svg'
import IcError from '../../assets/images/toast/ic_error.svg'
import IcWarning from '../../assets/images/toast/ic_warning.svg'
import { FadeLoader } from 'react-spinners'

import { useDispatch } from 'react-redux'

const AlertCustom = ({ dataItem, status, closeToast }) => {
  const { message, isLoading } = dataItem
  const loadIconView = (status) => {
    console.log('status', status)
    switch (status) {
      case 'success':
        return <img src={IcSuccess} alt="Success" />
      case 'info':
        return <img src={IcInfo} alt="Info" />
      case 'warning':
        return <img src={IcWarning} alt="Warning" />
      case 'error':
        return <img src={IcError} alt="Error" />
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
            <span className="font-poppins font-semibold text-base">
              {message.title}
            </span>
          )}
          {message.description && (
            <span className="font-poppins font-normal text-sm text-white">
              {message.description}
            </span>
          )}
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
        <img src={IcClose} alt="" onClick={closeToast} />
      )}
    </div>
  )
}

export default AlertCustom
