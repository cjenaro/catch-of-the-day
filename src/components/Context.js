import React, { createContext, useState, useEffect } from 'react'
import base from '../base'
import firebase from 'firebase'
const AppContext = createContext({ fishes: {}, order: {} })
const LocalStateProvider = AppContext.Provider

function AppStateProvider(props) {
  const [appState, setAppState] = useState({ fishes: {}, order: {} })
  const fetchFishes = async () => {
    return await base.fetch(`${props.storeId}/fishes`, {})
  }

  useEffect(() => {
    const order = JSON.parse(window.localStorage.getItem(props.storeId)) || {}

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await authHandler(user)
      }
    })

    if (!appState.fishes.length) {
      fetchFishes()
        .then(fishes => {
          setAppState({ fishes: fishes || {}, order })
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
  const deleteFromOrder = key => {
    const order = { ...appState.order }
    delete order[key]
    setAppState({ ...appState, order })
  }

  const updateFish = (key, data) => {
    const fishToUpdate = appState.fishes[key]
    if (fishToUpdate) {
      const fishes = { ...appState.fishes }
      fishes[key] = data
      setAppState({ ...appState, fishes })
    }
  }

  const deleteFish = key => {
    const fishes = { ...appState.fishes }
    fishes[key] = null
    setAppState({ ...appState, fishes })
  }

  const authHandler = async user => {
    const store = await base.fetch(`${props.storeId}`, {})
    if (!store.owner) {
      await base.post(`${props.storeId}/owner`, {
        data: user.uid,
      })
    }

    setAppState({
      ...appState,
      uid: user.uid,
      owner: store.owner || user.uid,
    })
  }

  const logout = async () => {
    await firebase.auth().signOut()
    setAppState({ ...appState, uid: null })
  }

  return (
    <LocalStateProvider
      value={{
        appState,
        updateStepperState,
        addFish,
        addFishes,
        addToOrder,
        updateFish,
        deleteFish,
        deleteFromOrder,
        authHandler,
        logout,
      }}
    >
      {props.children}
    </LocalStateProvider>
  )
}

export { AppStateProvider, AppContext }
