import React, { createContext, useState, useEffect } from 'react'

const AppContext = createContext({ fishes: {}, order: {} })
const LocalStateProvider = AppContext.Provider

function AppStateProvider(props) {
  const [appState, setAppState] = useState({ fishes: {}, order: {} })

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

  const addToOrder = key => {
    const order = { ...appState.order }
    order[key] = order[key] + 1 || 1
    setAppState({ ...appState, order })
  }

  return (
    <LocalStateProvider
      value={{ appState, updateStepperState, addFish, addFishes, addToOrder }}
    >
      {props.children}
    </LocalStateProvider>
  )
}

export { AppStateProvider, AppContext }
