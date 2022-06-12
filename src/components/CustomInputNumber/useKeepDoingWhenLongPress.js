import * as React from 'react'
import useLongPress from '~/hooks/useLongPress'

export default function useKeepDoingWhenLongPress(action, ref, customOptions) {
  const defaultOptions = {
    longPressTime: 400,
    intervalTime: 50,
  }

  const options = { ...defaultOptions, ...customOptions }

  const [triggered, setTriggered] = React.useState()

  const trigger = React.useCallback(() => {
    setTriggered(true)
  }, [])

  const stop = React.useCallback(() => {
    setTriggered(false)
  }, [])

  const intervalRef = React.useRef()
  const savedAction = React.useRef(action)

  React.useEffect(() => {
    savedAction.current = action
  }, [action])

  React.useEffect(() => {
    if (triggered) {
      const tick = () => savedAction.current()
      intervalRef.current = window.setInterval(tick, options.intervalTime)
    } else {
      window.clearInterval(intervalRef.current)
    }

    return () => window.clearInterval(intervalRef.current)
  }, [options.intervalTime, triggered])

  return useLongPress(trigger, stop, options.longPressTime, ref)
}
