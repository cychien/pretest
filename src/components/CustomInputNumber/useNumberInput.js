import * as React from 'react'
import useCounter from '~/hooks/useCounter'
import useKeepDoingWhenLongPress from './useKeepDoingWhenLongPress'
import { MAX_SAFE_INTEGER } from '~/constants/number'

function useNumberInput({
  min = 0,
  max = MAX_SAFE_INTEGER,
  step = 1,
  name,
  value,
  disabled = false,
  onChange: onChangeProps,
  onBlur: onBlurProps,
}) {
  const inputRef = React.useRef()
  const incrementButtonRef = React.useRef()
  const decrementButtonRef = React.useRef()

  const [counter, incrementFn, decrementFn, updateFn, setCounterValueFn] =
    useCounter(value || min, {
      step,
      min,
      max,
    })

  const sanitize = React.useCallback((val) => {
    return val
      .split('')
      .filter((v) => v.match(/^\d$/))
      .join('')
  }, [])

  const callOnChangeProps = React.useCallback(
    (value) => {
      if (onChangeProps) {
        onChangeProps({
          target: {
            name,
            value,
          },
        })
      }
    },
    [name, onChangeProps]
  )

  // Call onChange props only when value changes
  const increment = React.useCallback(() => {
    const { prev, next } = incrementFn()
    if (next !== prev) {
      callOnChangeProps(next)
    }
  }, [callOnChangeProps, incrementFn])

  const decrement = React.useCallback(() => {
    const { prev, next } = decrementFn()
    if (next !== prev) {
      callOnChangeProps(next)
    }
  }, [callOnChangeProps, decrementFn])

  const longPressIncrementEvents = useKeepDoingWhenLongPress(
    increment,
    incrementButtonRef.current
  )
  const longPressDecrementEvents = useKeepDoingWhenLongPress(
    decrement,
    decrementButtonRef.current
  )

  const onInputChange = React.useCallback(
    (e) => {
      const sanitizedValue = sanitize(e.target.value)
      const { prev, next } = setCounterValueFn(sanitizedValue)
      if (next !== prev) {
        callOnChangeProps(sanitizedValue)
      }
    },
    [callOnChangeProps, sanitize, setCounterValueFn]
  )

  const onInputBlur = React.useCallback(
    (e) => {
      const clickTarget = e.relatedTarget ?? document
      if (
        inputRef.current &&
        incrementButtonRef.current &&
        decrementButtonRef.current &&
        !inputRef.current.contains(clickTarget) &&
        !incrementButtonRef.current.contains(clickTarget) &&
        !decrementButtonRef.current.contains(clickTarget)
      ) {
        const { next } = updateFn(counter.valueAsNumber)
        if (onBlurProps) {
          onBlurProps({
            target: {
              name,
              value: next,
            },
          })
        }
      }
    },
    [counter.valueAsNumber, name, onBlurProps, updateFn]
  )

  const onInputKeyDown = React.useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowUp': {
          increment()
          break
        }
        case 'ArrowDown': {
          decrement()
          break
        }
        default: {
          break
        }
      }
    },
    [decrement, increment]
  )

  const incrementButtonProps = React.useMemo(
    () => ({
      role: 'button',
      tabIndex: -1,
      onClick: increment,
      disabled: disabled || counter.isAtMax,
      ...longPressIncrementEvents,
      ref: incrementButtonRef,
    }),
    [increment, disabled, counter.isAtMax, longPressIncrementEvents]
  )

  const decrementButtonProps = React.useMemo(
    () => ({
      role: 'button',
      tabIndex: -1,
      onClick: decrement,
      disabled: disabled || counter.isAtMin,
      ...longPressDecrementEvents,
      ref: decrementButtonRef,
    }),
    [decrement, disabled, counter.isAtMin, longPressDecrementEvents]
  )

  const inputFieldProps = React.useMemo(
    () => ({
      name,
      type: 'text',
      role: 'spinbutton',
      inputMode: 'numeric',
      pattern: /[0-9]*$/,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': counter.valueAsNumber,
      'aria-valuetext': counter.valueAsNumber,
      autoComplete: 'off',
      autoCorrect: 'off',
      value: counter.value,
      disabled,
      onChange: onInputChange,
      onBlur: onInputBlur,
      onKeyDown: onInputKeyDown,
      ref: inputRef,
    }),
    [
      name,
      min,
      max,
      counter.valueAsNumber,
      counter.value,
      disabled,
      onInputChange,
      onInputBlur,
      onInputKeyDown,
    ]
  )

  return { inputFieldProps, incrementButtonProps, decrementButtonProps }
}

export default useNumberInput
