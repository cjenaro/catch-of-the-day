import React, { useContext } from 'react'
import { AppContext } from './Context'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import Fish from './Fish'

const App = props => {
  const { appState, addFish } = useContext(AppContext)

  return (
    <div className='catch-of-the-day'>
      <div className='menu'>
        <Header tagline='Fresh Seafood Market' />
        <ul className='fishes'>
          {Object.keys(appState.fishes).map(key => {
            return appState.fishes[key] && <Fish key={key} {...appState.fishes[key]} keyToPass={key} />
          })}
        </ul>
      </div>
      <Order />
      <Inventory />
    </div>
  )
}

export default App
