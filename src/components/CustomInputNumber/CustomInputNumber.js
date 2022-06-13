import * as React from 'react'
import useNumberInput from './useNumberInput'

function CustomInputNumber(props) {
  const { inputFieldProps, incrementButtonProps, decrementButtonProps } =
    useNumberInput(props)

  return (
    <div className="flex space-x-xs items-center">
      <DecrementButton {...decrementButtonProps} />
      <InputField {...inputFieldProps} />
      <IncrementButton {...incrementButtonProps} />
    </div>
  )
}

const IncrementButton = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    className="min-w-[48px] min-h-[48px] w-2xl h-2xl flex justify-center items-center border border-primary-500 bg-white text-primary-500 rounded select-none hover:bg-primary-50 disabled:opacity-30 disabled:bg-white disabled:cursor-not-allowed"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-lg w-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  </button>
))

const DecrementButton = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    className="min-w-[48px] min-h-[48px] w-2xl h-2xl flex justify-center items-center border border-primary-500 bg-white text-primary-500 rounded select-none hover:bg-primary-50 disabled:opacity-30 disabled:bg-white disabled:cursor-not-allowed"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-lg w-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  </button>
))

const InputField = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    className="min-w-[48px] min-h-[48px] w-2xl h-2xl border border-gray-400 bg-white rounded text-center focus:outline-none focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
    {...props}
  />
))

IncrementButton.displayName = 'IncrementButton'
DecrementButton.displayName = 'DecrementButton'
InputField.displayName = 'InputField'

export default CustomInputNumber
