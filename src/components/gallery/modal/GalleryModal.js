import { useDispatch, useSelector } from 'react-redux'

import { showModal, uploadedFile } from '../gallerySlice'

import DragDrop from './DragDrop'

import '../gallery.scss'

const GalleryModal = () => {

  const dispatch = useDispatch()
  const showMod = useSelector(state => state.gallerySlice.showModal)

  const onClose = (e) => {
    const cont = document.querySelector('.modal-container')
    const window = cont.querySelector('.modal-window')
    if (e.target !== window && e.target === cont) {
      dispatch(showModal(false))
      dispatch(uploadedFile({name: null, url: null}))
    }
  }

  return (
    <div onClick={(e) => onClose(e)} className={`modal-container  ${showMod ? 'show-modal' : 'hide-modal'}`}>
      <div className='modal-window'>
        <button
          className='modal-close'
          onClick={() => {
            dispatch(showModal(false))
            dispatch(uploadedFile({name: null, url: null}))
          }}>
        </button>
        <div className="scroll-container">
          <DragDrop />
        </div>
      </div>
    </div>
  )
}

export default GalleryModal