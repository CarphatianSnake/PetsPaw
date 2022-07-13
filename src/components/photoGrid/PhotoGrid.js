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
                <div key={item.id} style={{backgroundImage: `url('${item.photo ? item.photo.url : null}')`}} className='photo-grid-item test'></div>
                ))}
        </div>
        <GridNavBtns page={page} totalpages={photos.length - 1} />
      </>
    )
  }

  return breedGrid(page)
}

export default PhotoGrid;