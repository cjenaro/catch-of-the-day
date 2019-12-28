import React, { useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AppContext } from './Context'
import { formatPrice } from '../helpers'

const Order = () => {
  const { appState, deleteFromOrder } = useContext(AppContext)
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
      <TransitionGroup component='ul' className='order'>
        {orderIds.map(key => {
          const fish = appState.fishes[key]
          const count = appState.order[key]
          const isAvailable = fish && fish.status === 'available'
          if (!isAvailable) {
            return (
              <CSSTransition
                classNames='order'
                key={key}
                timeout={{ enter: 250, exit: 250 }}
              >
                <li key={key}>
                  Sorry {fish ? fish.name : 'fish'} is no longer available
                </li>
              </CSSTransition>
            )
          }
          return (
            <CSSTransition
              classNames='order'
              key={key}
              timeout={{ enter: 250, exit: 250 }}
            >
              <li key={key}>
                <span>
                  <TransitionGroup component='span' className='count'>
                    <CSSTransition
                      classNames='count'
                      key={count}
                      timeout={{ enter: 250, exit: 250 }}
                    >
                      <span>{count}</span>
                    </CSSTransition>
                  </TransitionGroup>
                  lbs {fish.name}
                  {formatPrice(count * fish.price)}
                  <button onClick={() => deleteFromOrder(key)}>&times;</button>
                </span>
              </li>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      <div className='total'>
        Total: <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  )
}

export default Order
