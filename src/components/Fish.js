import React, { useContext } from 'react'
import { formatPrice } from '../helpers'
import { AppContext } from './Context'

const Fish = props => {
  const { image, name, price, desc, status, keyToPass } = props
  const isAvailable = status === 'available'
  const { addToOrder } = useContext(AppContext)

  return (
    <li className='menu-fish'>
      <img src={image} alt={name} />
      <h3 className='fish-name'>
        {name}
        <span className='price'>{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button disabled={!isAvailable} onClick={() => addToOrder(keyToPass)}>
        {isAvailable ? 'Add To Order' : 'Sold Out!'}
      </button>
    </li>
  )
}

export default Fish
