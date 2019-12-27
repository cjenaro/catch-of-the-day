import React, { createContext, useState, useEffect } from 'react'

const AppContext = createContext({ fishes: {}, orders: {} })
const LocalStateProvider = AppContext.Provider

function AppStateProvider(props) {
  const [appState, setAppState] = useState({ fishes: {}, orders: {} })

  // useEffect(() => {
  //   window.localStorage.setItem('appState', JSON.stringify(appState))
  // }, [appState])

  function updateStepperState(appState) {
    setAppState(appState)
  }

  const addFish = newFish => {
    const fishes = { ...appState.fishes }
    fishes[`fish${Date.now()}`] = newFish
    setAppState({ ...appState, fishes })
  }
  
  const addFishes = fishesToAdd => {
    const fishes = { ...appState.fishes, ...fishesToAdd }
    setAppState({ ...appState, fishes })
  }

  return (
    <LocalStateProvider value={{ appState, updateStepperState, addFish, addFishes }}>
      {props.children}
    </LocalStateProvider>
  )
}

export { AppStateProvider, AppContext }
