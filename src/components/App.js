import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

const App = (props) => {
  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header />
      </div>
      <Inventory />
      <Order />
    </div>
  )
}

export default App