import React, { useState } from 'react'
import { getFunName } from '../helpers'

const StorePicker = () => {
  const [store, setStore] = useState(getFunName())

  const goToStore = (e) => {
    e.preventDefault();
    
  }

  return (
    <form onSubmit={goToStore} className='store-selector'>
      <h2>Please Enter A Store</h2>
      <input type="text" required placeholder="Store Name" value={store} onChange={(e) => setStore(e.target.value)} />
      <button tpye="submit">Visit Store</button>
    </form>
  )
}

export default StorePicker
