import * as React from 'react'
import produce from 'immer'

function correct(value, min, max) {
  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value
}

function RoomAllocationReducer(state, action) {
  switch (action.type) {
    case 'change-adult': {
      const { index, value } = action.payload
      return produce(state, (draft) => {
        const valueAsNumber = value === '' ? 0 : parseInt(value, 10)

        const max = Math.min(
          state.waitToAllocate + state.allocation[index].adult,
          4 - state.allocation[index].child
        )

        const validValue = correct(valueAsNumber, 1, max)

        const diff = validValue - state.allocation[index].adult
        draft.waitToAllocate = state.waitToAllocate - diff
        draft.allocation[index].adult = validValue
      })
    }
    case 'change-child': {
      const { index, value } = action.payload
      return produce(state, (draft) => {
        const valueAsNumber = value === '' ? 0 : parseInt(value, 10)

        const max = Math.min(
          state.waitToAllocate + state.allocation[index].child,
          4 - state.allocation[index].adult
        )

        const validValue = correct(valueAsNumber, 0, max)

        const diff = validValue - state.allocation[index].child
        draft.waitToAllocate = state.waitToAllocate - diff
        draft.allocation[index].child = validValue
      })
    }
  }
}

function useRoomAllocation({ guest, room, onChange: onChangeProps }) {
  const initialRoomAllocation = {
    waitToAllocate: guest - room,
    allocation: Array.from(Array(room)).map(() => ({
      adult: 1,
      child: 0,
    })),
  }

  const [roomAllocation, dispatch] = React.useReducer(
    RoomAllocationReducer,
    initialRoomAllocation
  )

  React.useEffect(() => {
    onChangeProps(roomAllocation.allocation)
  }, [onChangeProps, roomAllocation.allocation])

  const getRoomProps = React.useCallback(
    (roomIndex) => {
      const { adult, child } = roomAllocation.allocation[roomIndex]

      return {
        roomName: `room${roomIndex}`,
        adult: {
          number: adult,
          max: Math.min(roomAllocation.waitToAllocate + adult, 4 - child),
          onChange: (value) => {
            dispatch({
              type: 'change-adult',
              payload: { index: roomIndex, value },
            })
          },
        },
        child: {
          number: child,
          max: Math.min(roomAllocation.waitToAllocate + child, 4 - adult),
          onChange: (value) => {
            dispatch({
              type: 'change-child',
              payload: { index: roomIndex, value },
            })
          },
        },
        disabled: guest === room,
      }
    },
    [guest, room, roomAllocation.allocation, roomAllocation.waitToAllocate]
  )

  return { guest, room, roomAllocation, getRoomProps }
}

export default useRoomAllocation
