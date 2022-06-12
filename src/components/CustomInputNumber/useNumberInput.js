import * as React from 'react'
import useCounter from '~/hooks/useCounter'
import useKeepDoingWhenLongPress from './useKeepDoingWhenLongPress'

const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991

function useNumberInput({
  min = 0,
  max = maxSafeInteger,
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

  const [counter, incrementFn, decrementFn, updateFn, setCounterValue] =
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

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (
        inputRef.current &&
        incrementButtonRef.current &&
        decrementButtonRef.current &&
        !inputRef.current.contains(e.target) &&
        !incrementButtonRef.current.contains(e.target) &&
        !decrementButtonRef.current.contains(e.target)
      ) {
        const value = updateFn(counter.valueAsNumber)
        if (onBlurProps) {
          onBlurProps({
            target: {
              name,
              value,
            },
          })
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [counter.valueAsNumber, name, onBlurProps, updateFn])

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

  const increment = React.useCallback(() => {
    const value = incrementFn()
    if (value) {
      callOnChangeProps(value)
    }
  }, [callOnChangeProps, incrementFn])

  const decrement = React.useCallback(() => {
    const value = decrementFn()
    if (value) {
      callOnChangeProps(value)
    }
  }, [callOnChangeProps, decrementFn])

  const update = React.useCallback(
    (val) => {
      setCounterValue(val)
      callOnChangeProps(val)
    },
    [callOnChangeProps, setCounterValue]
  )

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
      update(sanitizedValue)
    },
    [sanitize, update]
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
      onInputKeyDown,
    ]
  )

  return { inputFieldProps, incrementButtonProps, decrementButtonProps }
}

export default useNumberInput
