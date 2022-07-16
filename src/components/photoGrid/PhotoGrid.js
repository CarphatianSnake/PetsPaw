import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import GridNavBtns from './GridNavBtns'
import { breedId, breedName, removePhotos } from '../breeds/breedsSlice'
import { getFavourites } from '../favourites/favouritesSlice'

import './photoGrid.scss'

const PhotoGrid = (props) => {
  
  const {name, photos} = props

  const [onElement, setOnElement] = useState()
  const [favCheck, setFavCheck] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const page = useSelector(state => state.pageSlice.gridPage)
  const favsList = useSelector(getFavourites)

  const onGridOn = (e, id) => {
    setOnElement(e.target.querySelector('div'))
    e.target.querySelector('div').classList.add('grid-active')
    setFavCheck(favsList.filter(item => item.imageID === id)[0])
  }

  const onGridOut = () => {
    onElement.classList.remove('grid-active')
  }

  const breedElement = (id, name) => {

    const onBreed = () => {
      dispatch(removePhotos())
      dispatch(breedName(name))
      dispatch(breedId(id))
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

  const galeryElement = (id) => {

    const onFav = (e) => {
      console.log('Toggle favorite');
      const buttonClass = e.target.classList
      if (buttonClass.contains('gallery-btn')) {
        buttonClass.remove('gallery-btn')
        buttonClass.add('active-gallery-btn')
      } else {
        buttonClass.remove('active-gallery-btn')
        buttonClass.add('gallery-btn')
      }
    }

    const isFav = () => {
      
      return favCheck ? 'active-gallery-btn' : 'gallery-btn'
    }

    const btnCls = isFav()

    return (
      <div className='gallery-hover-element'>
        <button
          onClick={(e) => onFav(e)}
          className={btnCls}>
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
            const element = galeryElement(item.id)
            return (
              <div
                onMouseEnter={(e) => onGridOn(e, item.id)}
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