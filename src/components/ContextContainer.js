import React, { useContext } from 'react'
import App from './App'
import { AppStateProvider } from './Context'

const ContextContainer = props => {
  return (
    <AppStateProvider storeId={props.match.params.storeId} value={{}}>
      <App />
    </AppStateProvider>
  )
}

export default ContextContainer
