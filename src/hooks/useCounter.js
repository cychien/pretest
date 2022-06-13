import * as React from 'react'
import { MAX_SAFE_INTEGER } from '~/constants/number'

function formatStringAsNumber(str) {
  const validString = str.toString().replace(/\s/g, '')
  return parseInt(validString, 10)
}

function useCounter(initialValue = 0, customOptions) {
  const defaultOptions = {
    step: 1,
    min: 0,
    max: MAX_SAFE_INTEGER,
  }

  const options = { ...defaultOptions, ...customOptions }

  const [value, setValue] = React.useState(initialValue)
  const valueAsNumber = formatStringAsNumber(value)
  const isAtMax = valueAsNumber + options.step > options.max
  const isAtMin = valueAsNumber - options.step < options.min

  const increment = React.useCallback(() => {
    const prevValueAsNumber = valueAsNumber.toString()

    let next
    if (isNaN(valueAsNumber)) {
      next = options.min
    } else if (valueAsNumber > options.max) {
      next = options.max
    } else if (valueAsNumber < options.min) {
      next = options.min
    } else {
      next = isAtMax ? valueAsNumber : valueAsNumber + options.step
    }

    setValue(next.toString())
    return { prev: prevValueAsNumber, next: next.toString() }
  }, [isAtMax, options.max, options.min, options.step, valueAsNumber])

  const decrement = React.useCallback(() => {
    const prevValueAsNumber = valueAsNumber.toString()

    let next
    if (isNaN(valueAsNumber)) {
      next = options.min
    } else if (valueAsNumber > options.max) {
      next = options.max
    } else if (valueAsNumber < options.min) {
      next = options.min
    } else {
      next = isAtMin ? valueAsNumber : valueAsNumber - options.step
    }

    setValue(next.toString())
    return { prev: prevValueAsNumber, next: next.toString() }
  }, [isAtMin, options.max, options.min, options.step, valueAsNumber])

  const update = React.useCallback(
    (val) => {
      const valAsNumber = formatStringAsNumber(val)
      const prevValueAsNumber = valueAsNumber.toString()

      let next
      if (isNaN(valAsNumber)) {
        next = options.min
      } else if (valAsNumber < options.min) {
        next = options.min
      } else if (valAsNumber > options.max) {
        next = options.max
      } else {
        next = valAsNumber
      }

      setValue(next.toString())
      return { prev: prevValueAsNumber, next: next.toString() }
    },
    [options.max, options.min, valueAsNumber]
  )

  const setCounterValue = React.useCallback(
    (val) => {
      const prevValue = value.toString()
      setValue(val.toString())
      return { prev: prevValue, next: val.toString() }
    },
    [value]
  )

  return [
    { value, valueAsNumber, isAtMin, isAtMax },
    increment,
    decrement,
    update,
    setCounterValue,
  ]
}

export default useCounter
