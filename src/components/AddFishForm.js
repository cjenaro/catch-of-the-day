import React, { useContext } from 'react'
import { AppContext } from './Context'

const AddFishForm = () => {
  const { addFish } = useContext(AppContext)
  
  const createFish = e => {
    e.preventDefault()
    addFish({
      name: e.target.name.value,
      price: parseFloat(e.target.price.value || '0'),
      status: e.target.status.value,
      desc: e.target.desc.value,
      image: e.target.image.value,
    })
    e.currentTarget.reset()
  }

  return (
    <form className='fish-edit' onSubmit={createFish}>
      <input type='text' placeholder='Name' name='name' id='name' />
      <input type='text' placeholder='Price' name='price' id='price' />
      <select name='status' id='status'>
        <option value='available'>Fresh!</option>
        <option value='unavailable'>Sold Out!</option>
      </select>
      <textarea
        type='text'
        placeholder='Desciption'
        name='desc'
        id='desc'
      ></textarea>
      <input type='text' placeholder='Image' name='image' id='image' />
      <button type='submit'>+ Add Fish</button>
    </form>
  )
}

export default AddFishForm
