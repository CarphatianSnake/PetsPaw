import { useSelector, useDispatch } from 'react-redux'

import { postPhoto } from '../gallerySlice'

import '../gallery.scss'

const UploadBtn = ({file}) => {

  const dispatch = useDispatch()
  const uploadingStatus = useSelector(state => state.gallerySlice.uploadingStatus)

  const uploadBtn = <button onClick={() => {dispatch(postPhoto(file))}} className="upload-btn">Upload Photo</button>
  const uploadingBtn = <button className="uploading-btn" disabled>Uploading</button>
  const successMessage = <div className="upload-msg success-msg">Thanks for the Upload - Cat found!</div>
  const faliMessage = <div className="upload-msg fail-msg">No Cat found - try a different one</div>

  const btnToRender = () => {
    switch (uploadingStatus) {
      case 'waiting':
        return uploadBtn
      case 'uploading':
        return uploadingBtn
      case 'uploaded':
        return successMessage
      case 'error':
        return faliMessage
      default: 
        return null
    }
  }

  return btnToRender()
}

export default UploadBtn