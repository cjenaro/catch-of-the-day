import React, { useContext } from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import { AppContext } from './Context'
import fishes from '../sample-fishes'
import Login from './Login'

const Inventory = () => {
  const { addFishes, appState, logout } = useContext(AppContext)
  const logoutBtn = <button onClick={logout}>Logout!</button>

  const loadSampleFishes = () => {
    let fishesToAdd = {}
    for (const [key, value] of Object.entries(fishes)) {
      fishesToAdd[key] = { ...value }
    }
    addFishes(fishesToAdd)
  }

  if (!appState.uid) {
    return <Login />
  }

  if (appState.uid !== appState.owner) {
    return (
      <div>
        <p>Sorry, you are not the owner of this store!</p>
        {logoutBtn}
      </div>
    )
  }

  return (
    <div className='inventory'>
      <h2>Inventory</h2>
      {logoutBtn}
      {Object.keys(appState.fishes).map(
        key =>
          appState.fishes[key] && (
            <EditFishForm index={key} key={key} {...appState.fishes[key]} />
          )
      )}
      <AddFishForm />
      <button onClick={loadSampleFishes}>Load Fish Samples</button>
    </div>
  )
}

export default Inventory
