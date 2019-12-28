import React, { useContext } from 'react'
import { AppContext } from './Context'

const EditFishForm = props => {
  const { updateFish, appState, deleteFish } = useContext(AppContext)

  const handleChange = e => {
    const fish = { ...appState.fishes[props.index] }
    fish[e.currentTarget.id] = e.currentTarget.value
    updateFish(props.index, fish)
  }

  return (
    <div className='fish-edit'>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={props.name}
        onChange={handleChange}
        id='name'
      />
      <input
        type='text'
        placeholder='Price'
        name='price'
        value={props.price}
        onChange={handleChange}
        id='price'
      />
      <select
        name='status'
        value={props.status}
        onChange={handleChange}
        id='status'
      >
        <option value='available'>Fresh!</option>
        <option value='unavailable'>Sold Out!</option>
      </select>
      <textarea
        type='text'
        placeholder='Desciption'
        name='desc'
        value={props.desc}
        onChange={handleChange}
        id='desc'
      ></textarea>
      <input
        type='text'
        placeholder='Image'
        name='image'
        value={props.image}
        onChange={handleChange}
        id='image'
      />
      <button onClick={() => deleteFish(props.index)}>Remove Fish</button>
    </div>
  )
}

export default EditFishForm
