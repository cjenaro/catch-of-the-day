import React, { useContext } from 'react'
import AddFishForm from './AddFishForm'
import { AppContext } from './Context'
import fishes from '../sample-fishes'

const Inventory = () => {
  const { addFishes } = useContext(AppContext)

  const loadSampleFishes = () => {
    let fishesToAdd = {}
    for (const [key, value] of Object.entries(fishes)) {
      fishesToAdd[key] = { ...value }
    }
    addFishes(fishesToAdd)
  }

  return (
    <div className='inventory'>
      <h2>Inventory</h2>
      <AddFishForm />
      <button onClick={loadSampleFishes}>Load Fish Samples</button>
    </div>
  )
}

export default Inventory
