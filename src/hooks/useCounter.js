import * as React from 'react'

const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991

function useCounter(initialValue = 0, customOptions) {
  const defaultOptions = {
    step: 1,
    min: 0,
    max: maxSafeInteger,
  }

  const options = { ...defaultOptions, ...customOptions }

  const [value, setValue] = React.useState(initialValue)
  const valueAsNumber = parseInt(value, 10)
  const isAtMax = valueAsNumber + options.step > options.max
  const isAtMin = valueAsNumber - options.step < options.min

  const isValidValue = React.useCallback(
    (valueAsNumber) =>
      valueAsNumber >= options.min && valueAsNumber <= options.max,
    [options.max, options.min]
  )

  const increment = React.useCallback(() => {
    if (isValidValue(valueAsNumber) && !isAtMax) {
      const next = valueAsNumber + options.step
      setValue(next.toString())
      return next.toString()
    }

    if (!isValidValue(valueAsNumber)) {
      let next
      if (valueAsNumber > options.max) {
        next = options.max
      } else if (valueAsNumber < options.min) {
        next = options.min
      } else {
        next = options.min
      }

      setValue(next.toString())
      return next.toString()
    }
  }, [
    isAtMax,
    isValidValue,
    options.max,
    options.min,
    options.step,
    valueAsNumber,
  ])

  const decrement = React.useCallback(() => {
    if (isValidValue(valueAsNumber) && !isAtMin) {
      const next = valueAsNumber - options.step
      setValue(next.toString())
      return next.toString()
    }

    if (!isValidValue(valueAsNumber)) {
      let next
      if (valueAsNumber > options.max) {
        next = options.max
      } else if (valueAsNumber < options.min) {
        next = options.min
      } else {
        next = options.min
      }

      setValue(next.toString())
      return next.toString()
    }
  }, [
    isAtMin,
    isValidValue,
    options.max,
    options.min,
    options.step,
    valueAsNumber,
  ])

  const update = React.useCallback(
    (val) => {
      const valAsNumber = parseInt(val, 10)

      let next

      if (isNaN(valAsNumber)) {
        next = options.min
      }

      if (valAsNumber < options.min) {
        next = options.min
      } else if (valAsNumber > options.max) {
        next = options.max
      } else {
        next = valAsNumber
      }

      setValue(next.toString())
      return next.toString()
    },
    [options.max, options.min]
  )

  return [
    { value, valueAsNumber, isAtMin, isAtMax },
    increment,
    decrement,
    update,
    setValue,
  ]
}

export default useCounter
