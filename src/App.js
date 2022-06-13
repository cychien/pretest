import * as React from 'react'
import RoomAllocation from './components/RoomAllocation'
import CustomInputNumber from './components/CustomInputNumber'
import './style.css'

function App() {
  return (
    <Demos>
      <Demo name="⭐️ CustomInputNumber Component">
        <CustomInputNumber
          name="numberInput"
          min={1}
          max={10}
          step={1}
          value={1}
          // disabled
          onChange={(e) => {
            console.log(e.target.name)
            console.log(e.target.value)
          }}
          onBlur={(e) => {
            console.log(e.target.name)
            console.log(e.target.value)
          }}
        />
      </Demo>
      <Demo name="⭐️ RoomAllocation Component">
        <div className="max-w-[420px]">
          <RoomAllocation
            guest={8}
            room={3}
            onChange={(res) => {
              console.log(res)
            }}
          />
        </div>
      </Demo>
    </Demos>
  )
}

function Demos(props) {
  return (
    <div
      className="container mx-auto mt-[30px] space-y-2xl md:space-y-0 md:mt-[60px] md:flex"
      {...props}
    />
  )
}

function Demo({ name, children }) {
  return (
    <div className="md:flex-1">
      <div className="mb-md text-lg font-medium md:mb-xl">{name}</div>
      {children}
    </div>
  )
}

export default App
