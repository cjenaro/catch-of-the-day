import React, { useContext } from 'react'
import { AppContext } from './Context'
import { formatPrice } from '../helpers'

const Order = () => {
  const { appState } = useContext(AppContext)
  const orderIds = Object.keys(appState.order)
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = appState.fishes[key]
    const count = appState.order[key]
    const isAvailable = fish && fish.status === 'available'
    if (isAvailable) {
      return prevTotal + count * fish.price
    }
    return prevTotal
  }, 0)

  return (
    <div className='order-wrap'>
      <h2>Order</h2>
      <ul>
        {orderIds.map(key => {
          const fish = appState.fishes[key]
          const count = appState.order[key]
          const isAvailable = fish.status === 'available'
          if (!isAvailable) {
            return (
              <li key={key}>
                Sorry {fish ? fish.name : 'fish'} is no longer available
              </li>
            )
          }
          return (
            <li key={key}>
              {count} lbs {fish.name}
              {formatPrice(count * fish.price)}
            </li>
          )
        })}
      </ul>
      <div className='total'>
        Total: <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  )
}

export default Order
