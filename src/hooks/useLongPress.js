import * as React from 'react'

export default function useLongPress(
  onLongPress,
  onLongPressEnd,
  delay = 400,
  ref
) {
  const [timer, setTimer] = React.useState()

  const start = React.useCallback(() => {
    const tid = setTimeout(() => {
      onLongPress()
    }, delay)

    setTimer(tid)
  }, [delay, onLongPress])

  const clear = React.useCallback(() => {
    if (timer) {
      clearTimeout(timer)
      setTimer()
      if (onLongPressEnd) {
        onLongPressEnd()
      }
    }
  }, [onLongPressEnd, timer])

  // If clicked element turn into disabled, we will terminate this longPress session as well
  React.useEffect(() => {
    let observer
    if (timer && ref) {
      observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === 'disabled') {
            clearTimeout(timer)
            if (onLongPressEnd) {
              onLongPressEnd()
            }
            setTimer()
          }
        })
      })

      observer.observe(ref, { attributes: true })
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [onLongPressEnd, ref, timer])

  return React.useMemo(
    () => ({
      onMouseDown: (e) => start(e),
      onTouchStart: (e) => start(e),
      onMouseUp: (e) => clear(e),
      onMouseLeave: (e) => clear(e),
      onTouchEnd: (e) => clear(e),
    }),
    [clear, start]
  )
}
