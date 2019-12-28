import React, { createContext, useState, useEffect } from 'react'
import base from '../base'
const AppContext = createContext({ fishes: {}, order: {} })
const LocalStateProvider = AppContext.Provider

function AppStateProvider(props) {
  const [appState, setAppState] = useState({ fishes: {}, order: {} })

  useEffect(() => {
    const order = JSON.parse(window.localStorage.getItem(props.storeId)) || {}

    if (!appState.fishes.length) {
      console.log('INITIAL LOAD')
      base.fetch(`${props.storeId}/fishes`, {}).then(data => {
        setAppState({ fishes: data || {}, order })
      })
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(props.storeId, JSON.stringify(appState.order))

    base
      .update(`${props.storeId}/fishes`, { data: appState.fishes })
      .catch(err => console.log(err))
  }, [appState, props.storeId])

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
