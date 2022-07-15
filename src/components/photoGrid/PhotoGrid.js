import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import GridNavBtns from './GridNavBtns'
import { breedsSlice } from '../breeds/breedsSlice'

import './photoGrid.scss'

const PhotoGrid = (props) => {
  
  const {name, photos} = props

  const [onElement, setOnElement] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const page = useSelector(state => state.pageSlice.gridPage)

  const onGridOn = (e) => {
    setOnElement(e.target.querySelector('div'))
    e.target.querySelector('div').classList.add('grid-active')
  }

  const onGridOut = () => {
    onElement.classList.remove('grid-active')
  }

  const breedElement = (id, name) => {

    const onBreed = () => {
      dispatch(breedsSlice.actions.removePhotos())
      dispatch(breedsSlice.actions.breedName(name))
      dispatch(breedsSlice.actions.breedId(id))
      navigate(`../${id}`)
    }

    return (
      <div className='breed-hover-element'>
        <button
          onClick={onBreed}
          className='breed-btn'>
            {name}
        </button>
      </div>
    )
  }

  const galeryElement = (id, name) => {

    const onFav = () => {
      console.log('Toggle favorite');
    }

    return (
      <div className='gallery-hover-element'>
        <button
          onClick={onFav}
          className='gallery-btn'>
        </button>
      </div>
    )
  }

  const grid = (page) => {
    if (name === 'breeds') {
      return (
        <>
          <div className="photo-grid">
            {photos[page].map(item => {
              const element = breedElement(item.id, item.name)
              return (
              item.photo ? 
                <div
                  onMouseEnter={(e) => onGridOn(e)}
                  onMouseLeave={onGridOut}
                  key={item.id}
                  style={{backgroundImage: `url('${item.photo.url}')`}}
                  className='photo-grid-item'>
                    {element}
                </div>
                :
                <div
                  onMouseEnter={(e) => onGridOn(e)}
                  onMouseLeave={onGridOut}
                  key={item.id}
                  className='photo-grid-item no-photo'>
                    {element}
                </div>
              )
            })}
          </div>
          <GridNavBtns page={page} totalpages={photos.length - 1} />
        </>
      )
    }

    if (name === 'gallery') {
      return (
        <div className="photo-grid">
          {photos.map(item => {
            const element = galeryElement(item.id, item.name)
            return (
              <div
                onMouseEnter={(e) => onGridOn(e)}
                onMouseLeave={onGridOut}
                key={item.id}
                style={{backgroundImage: `url('${item.url}')`}}
                className='photo-grid-item'>
                  {element}
              </div>
            )
          })}
        </div>
      )
    }
    
  }

  return grid(page)

}

export default PhotoGrid;