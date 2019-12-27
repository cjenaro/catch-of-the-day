import React, { useState } from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

const App = (props) => {
  const [appState, setAppState] = useState({ fishes: {}, order: {}})

  const addFish = (newFish) => {
    const fishes = { ...appState.fishes }
    fishes[`fish${Date.now()}`] = newFish
    setAppState({...appState, fishes })
  }

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory addFish={addFish} />
    </div>
  )
}

export default App