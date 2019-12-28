import React, { useContext } from 'react'
import firebase from 'firebase'
import { firebaseApp } from '../base'
import { AppContext } from './Context'

const Login = () => {
  const { authHandler } = useContext(AppContext)

  const authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(({ user }) => authHandler(user))
  }

  return (
    <nav className='login'>
      <h2>Inventory Login</h2>
      <p>Sign in to manage your store's inventory</p>
      <button className='github' onClick={() => authenticate('Github')}>
        Log in with github
      </button>
      <button className='twitter' onClick={() => authenticate('Twitter')}>
        Log in with twitter
      </button>
      <button className='facebook' onClick={() => authenticate('Facebook')}>
        Log in with facebook
      </button>
    </nav>
  )
}

export default Login
