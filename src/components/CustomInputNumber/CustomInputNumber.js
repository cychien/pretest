import * as React from 'react'
import useNumberInput from './useNumberInput'

function CustomInputNumber(props) {
  const { inputFieldProps, incrementButtonProps, decrementButtonProps } =
    useNumberInput(props)

  return (
    <div className="flex space-x-sm items-center">
      <DecrementButton {...decrementButtonProps} />
      <InputField {...inputFieldProps} />
      <IncrementButton {...incrementButtonProps} />
    </div>
  )
}

// eslint-disable-next-line react/display-name
const IncrementButton = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    className="w-2xl h-2xl flex justify-center items-center border border-primary-500 bg-white text-primary-500 rounded hover:bg-primary-50 disabled:opacity-30"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-lg w-lg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  </button>
))

// eslint-disable-next-line react/display-name
const DecrementButton = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    className="w-2xl h-2xl flex justify-center items-center border border-primary-500 bg-white text-primary-500 rounded hover:bg-primary-50 disabled:opacity-30"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-lg w-lg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  </button>
))

// eslint-disable-next-line react/display-name
const InputField = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    className="w-2xl h-2xl border-2 border-gray-300 bg-white rounded text-center disabled:bg-gray-100 disabled:text-gray-600"
    {...props}
  />
))

export default CustomInputNumber
