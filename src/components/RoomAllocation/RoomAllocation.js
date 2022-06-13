import * as React from 'react'
import CustomInputNumber from '~/components/CustomInputNumber'
import useRoomAllocation from './useRoomAllocation'
import cx from 'classnames'

function RoomAllocation(props) {
  const { guest, room, roomAllocation, getRoomProps } = useRoomAllocation(props)

  return (
    <div>
      <div className="mb-md font-medium">
        住客人數：<span className="font-mono">{guest}</span> 人 /{' '}
        <span className="font-mono">{room}</span> 房
      </div>

      <div
        className={cx(
          'border px-md py-sm  rounded text-sm ',
          roomAllocation.waitToAllocate > 0
            ? 'border-primary-100 bg-primary-50 text-gray-800'
            : 'border-success-100 bg-success-50 text-success-800'
        )}
      >
        {roomAllocation.waitToAllocate > 0 ? (
          <>
            尚未分配人數：
            <span className="font-mono">
              {roomAllocation.waitToAllocate}
            </span>{' '}
            人
          </>
        ) : (
          <>分配完成，請按下一步</>
        )}
      </div>

      <div>
        {roomAllocation.allocation.map((_, index) => (
          <Room key={index} {...getRoomProps(index)} />
        ))}
      </div>
    </div>
  )
}

function Room({ roomName, adult, child, disabled }) {
  return (
    <div className="py-md border-b border-gray-200 last:border-0">
      <div className="mb-md font-medium">
        房間：<span className="font-mono">1</span> 人
      </div>
      <div className="space-y-sm">
        <div className="flex justify-between">
          <div className="text-sm">
            <div>大人</div>
            <div className="text-gray-500">年齡 20+</div>
          </div>
          <CustomInputNumber
            min={1}
            max={adult.max}
            step={1}
            name={`${roomName}-adult`}
            value={adult.number}
            disabled={disabled}
            onChange={(e) => {
              adult.onChange(e.target.value)
            }}
            onBlur={(e) => {
              adult.onChange(e.target.value)
            }}
          />
        </div>
        <div className="flex justify-between">
          <div className="text-sm">小孩</div>
          <CustomInputNumber
            min={0}
            max={child.max}
            step={1}
            name={`${roomName}-child`}
            value={child.number}
            disabled={disabled}
            onChange={(e) => {
              child.onChange(e.target.value)
            }}
            onBlur={(e) => {
              child.onChange(e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomAllocation
