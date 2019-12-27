import React, { useContext } from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import { AppContext } from './Context'

const App = props => {
  const { appState, addFish } = useContext(AppContext)

  return (
    <div className='catch-of-the-day'>
      <div className='menu'>
        <Header tagline='Fresh Seafood Market' />
      </div>
      <Order />
      <Inventory />
    </div>
  )
}

export default App
