import { useDispatch } from 'react-redux'

import { showModal, uploadedFile, resetUploadStatus } from '../gallerySlice'

import DragDrop from './DragDrop'

import '../gallery.scss'

const GalleryModal = () => {

  const dispatch = useDispatch()

  const hideModal = () => {
    dispatch(showModal(false))
    dispatch(uploadedFile({name: null, url: null}))
    dispatch(resetUploadStatus())
  }

  const onClose = (e) => {
    const cont = document.querySelector('.modal-container')
    const window = cont.querySelector('.modal-window')
    if (e.target !== window && e.target === cont) {
      hideModal()
    }
  }

  return (
    <div onClick={(e) => onClose(e)} className='modal-container'>
      <div className='modal-window'>
        <button
          className='modal-close'
          onClick={hideModal}>
        </button>
        <DragDrop />
      </div>
    </div>
  )
}

export default GalleryModal