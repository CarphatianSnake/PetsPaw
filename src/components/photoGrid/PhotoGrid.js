import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

import { breedId, breedName, removePhotos } from '../breeds/breedsSlice'
import { getFavourites, removeFromFav, fetchFavourites } from '../favourites/favouritesSlice'
import { addToFav } from '../votes/vSlice'

import './photoGrid.scss'

const PhotoGrid = (props) => {
  
  const {name, photos} = props

  const [photosList, setPhotosList] = useState(photos)


  const [onElement, setOnElement] = useState()
  const [favCheck, setFavCheck] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const favsList = useSelector(getFavourites)
  const isFavDelError = useSelector(state => state.favouritesSlice.favDeleting)
  const isFavLoaded = useSelector(state => state.favouritesSlice.favouritesLoading)

  // const onGridOn = (e, id) => {
  //   setOnElement(e.target.querySelector('div'))
  //   e.target.querySelector('div').classList.add('grid-active')
  //   if (name === 'gallery') {
  //     setFavCheck(favsList.filter(item => item.id === id)[0])
  //   }
  // }

  // const onGridOut = () => {
  //   onElement.classList.remove('grid-active')
  // }

  // const galeryElement = (id) => {

  //   if (isFavDelError === 'error') {
  //     dispatch(removeFromFav(favId))
  //   }

  //   const onFav = (e) => {
  //     const buttonClass = e.target.classList
  //     if (buttonClass.contains('gallery-btn')) {
  //       dispatch(addToFav(id))
  //       dispatch(fetchFavourites())
  //       buttonClass.remove('gallery-btn')
  //       buttonClass.add('active-gallery-btn')
  //     } else if (isFavLoaded === 'loaded') {
  //       dispatch(removeFromFav(favId))
  //       dispatch(fetchFavourites())
  //       buttonClass.remove('active-gallery-btn')
  //       buttonClass.add('gallery-btn')
  //     }
  //   }

  //   const isFav = () => {
  //     return favCheck ? 'active-gallery-btn' : 'gallery-btn'
  //   }

  //   const btnCls = isFav()

  //   return (
  //     <div className='gallery-hover-element'>
  //       <button
  //         onClick={(e) => onFav(e, id)}
  //         className={btnCls}>
  //       </button>
  //     </div>
  //   )
  // }

  // const grid = () => {

  //   if (name === 'gallery') {
  //     return (
  //       <div className="photo-grid">
  //         {photos.map(item => {
  //           const element = galeryElement(item.id)
  //           return (
  //             <div
  //               onMouseEnter={(e) => onGridOn(e, item.id)}
  //               onMouseLeave={onGridOut}
  //               key={nanoid()}
  //               style={{backgroundImage: `url('${item.url}')`}}
  //               className='photo-grid-item'>
  //                 {element}
  //             </div>
  //           )
  //         })}
  //       </div>
  //     )
  //   }
  // }

  const buttonStyle = name === 'breeds' ? '.breed-btn' : '.gallery-btn'

  const gridButtons = (name, breed, id, favId) => {
    
    switch (name) {

      case 'favourites':

        const onUnFav = () => {
          dispatch(removeFromFav(favId))
          dispatch(fetchFavourites())
          setPhotosList(photosList.filter(item => item.favId !== favId))
        }

        return <button onClick={onUnFav} className='gallery-btn' />

      case 'breeds':

        const onBreed = () => {
          dispatch(removePhotos())
          dispatch(breedName(name))
          dispatch(breedId(id))
          navigate(`../${id}`)
        }

        return (
          <button onClick={onBreed} className='breed-btn'>{breed}</button>
        )
    }
  }

  const hoverElement = (breed, id, favId) => {

    const hoverToggle = (e, cls, style) => {
      e.target.querySelector(cls).style = `display: ${style}`
    }

    const onHover = (e) => {
      hoverToggle(e, buttonStyle, 'block')
    }
    const outHover = (e) => {
      hoverToggle(e, buttonStyle, 'none')
    }

    return (
      <div onMouseEnter={(e) => onHover(e)} onMouseLeave={(e) => outHover(e)} className="hover-container">
        {gridButtons(name, breed, id, favId)}
      </div>
    )
  }

  const elements = photosList.map((item) => {
    return (
      <div
        key={nanoid()}
        style={{backgroundImage: `url(${item.url})`}}
        className={`photo-grid-item${item.url ? '' : ' no-photo'}`}>
          {hoverElement(item.name, item.id, item.favId)}
      </div>
    )
  })

  return (
    <div className="photo-grid">
      {elements}
    </div>
  )

}

export default PhotoGrid