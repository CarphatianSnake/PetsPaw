import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { breedId, breedName, removePhotos } from '../breeds/breedsSlice'
import { getFavourites, removeFromFav, fetchFavourites } from '../favourites/favouritesSlice'
import { addToFav } from '../votes/vSlice'
import gridConstructor from '../../services/gridConstructor/gridConstructor'

import './photoGrid.scss'

const PhotoGrid = (props) => {
  
  const {name, photos} = props

  const [photosList, setPhotosList] = useState(photos)
  const favsList = useSelector(getFavourites)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isFavLoaded = useSelector(state => state.favouritesSlice.favouritesLoading)

  useEffect(() => {
    if (name !== 'favourites') {
      setPhotosList(photos)
    }
  }, [photos, name])

  const gridButtons = (name, breed, id, favId) => {
    
    switch (name) {

      case 'favourites':

        const onUnFav = () => {
          dispatch(removeFromFav(favId))
          dispatch(fetchFavourites())
          setPhotosList(photosList.filter(item => item.favId !== favId))
        }

        return <button onClick={onUnFav} className='active-gallery-btn grid-btn' />

      case 'breeds':

        const onBreed = () => {
          dispatch(removePhotos())
          dispatch(breedName(name))
          dispatch(breedId(id))
          navigate(`../${id}`)
        }

        return (
          <button onClick={onBreed} className='breed-btn grid-btn'>{breed}</button>
        )

      case 'gallery':

        const fId = () => {if (isFavLoaded === 'loaded') return favsList.filter(item => item.id === id)[0]}

        const onFav = (e) => {
          const buttonClass = e.target.classList
          if (buttonClass.contains('gallery-btn')) {
            dispatch(addToFav(id))
            setTimeout(() => {dispatch(fetchFavourites())}, 1000)
            buttonClass.remove('gallery-btn')
            buttonClass.add('active-gallery-btn')
          } else if (isFavLoaded === 'loaded') {
            dispatch(removeFromFav(fId().favId))
            setTimeout(() => {dispatch(fetchFavourites())}, 1000)
            buttonClass.remove('active-gallery-btn')
            buttonClass.add('gallery-btn')
          }
        }

        const isFav = () => {
          if (isFavLoaded === 'loaded') {
            return fId() ? 'active-gallery-btn' : 'gallery-btn'
          }
        }
    
        const btnCls = isFav()

        return <button onClick={(e) => onFav(e, id)} className={`${btnCls} grid-btn`} />

      default: break

    }
  }

  const hoverElement = (breed, id, favId) => {

    const hoverToggle = (e, cls, style) => {
      e.target.querySelector(cls).style = `display: ${style}`
    }

    const onHover = (e) => {
      hoverToggle(e, '.grid-btn', 'block')
    }
    const outHover = (e) => {
      hoverToggle(e, '.grid-btn', 'none')
    }

    return (
      <div value={id} onMouseEnter={(e) => onHover(e)} onMouseLeave={(e) => outHover(e)} className="hover-container">
        {gridButtons(name, breed, id, favId)}
      </div>
    )
  }

  const elements = name === 'votes' ? gridConstructor(photosList) : gridConstructor(photosList, hoverElement)

  const noItems = <div className="no-items">No item found</div>

  return (
    <div className="photo-grid">
      {elements.length === 0 ? noItems : elements}
    </div>
  )

}

export default PhotoGrid