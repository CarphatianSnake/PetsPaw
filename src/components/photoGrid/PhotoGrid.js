import { useSelector } from 'react-redux'

import store from '../store/store'

import { getBreedsList } from '../breeds/breedsSlice'

import './photoGrid.scss'

const PhotoGrid = (props) => {

  const {name} = props
  const {getState} = store

  const isBreedsLoaded = useSelector(state => state.breedsSlice.breedsStatus)
  const limit = useSelector(state => state.breedsSlice.breedsLimit)

  const breedGrid = (limit) => {
    return (
      <div className="photo-grid">
        {isBreedsLoaded === 'loaded' ? 
          getBreedsList(getState())
            .slice(0, limit)
            .map(item => (
              <div key={item.id} style={{backgroundImage: `url('${item.photo.url}')`}} className='photo-grid-item test'><div className="hover-div"></div></div>
              )) : null
        }
      </div>
    )
  }

  return breedGrid(limit)
}

export default PhotoGrid;