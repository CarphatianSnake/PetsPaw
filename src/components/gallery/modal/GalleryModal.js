import { useDispatch, useSelector } from 'react-redux'

import { showModal } from '../gallerySlice'

import DragDrop from './DragDrop'

import '../gallery.scss'

const GalleryModal = () => {

  const dispatch = useDispatch()
  const showMod = useSelector(state => state.gallerySlice.showModal)

  const onClose = (e) => {
    const cont = document.querySelector('.modal-container')
    const window = cont.querySelector('.modal-window')
    if (e.target !== window && e.target === cont) {
      console.log(e);
      dispatch(showModal(false))
    }
  }

  return (
    <div onClick={(e) => onClose(e)} className={`modal-container  ${showMod ? 'show-modal' : 'hide-modal'}`}>
      <div className='modal-window'>
        <button className='modal-close' onClick={() => dispatch(showModal(false))}></button>
        <DragDrop />
      </div>
    </div>
  )
}

export default GalleryModal