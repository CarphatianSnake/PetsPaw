import { useSelector } from 'react-redux'

import GridNavBtns from './GridNavBtns'

import './photoGrid.scss'

const PhotoGrid = (props) => {
  
  const {name, photos} = props

  const page = useSelector(state => state.pageSlice.gridPage)

  const breedGrid = (page = 0) => {

    return (
      <>
        <div className="photo-grid">
          {photos[page].map(item => (
            item.photo ? 
              <div key={item.id} style={{backgroundImage: `url('${item.photo.url}')`}} className='photo-grid-item'></div> :
              <div key={item.id} className='photo-grid-item no-photo'></div>
                ))}
        </div>
        <GridNavBtns page={page} totalpages={photos.length - 1} />
      </>
    )
  }

  return breedGrid(page)
}

export default PhotoGrid;