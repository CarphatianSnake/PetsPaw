import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "react-drag-drop-files";

import { uploadedFile, readyToUpload } from '../gallerySlice'
import UploadBtn from "./UploadBtn";

import '../gallery.scss'

const fileTypes = ['JPG', 'PNG'];

const DragDrop = () => {

  const dispatch = useDispatch()
  const fileInfo = useSelector(state => state.gallerySlice.uploadedFile)
  const isUploadError = useSelector(state => state.gallerySlice.uploadingStatus)
  const [file, setFile] = useState(null)

  const handleChange = e => {
    const file = e
    const reader = new FileReader()
    reader.onloadend = () => {dispatch(uploadedFile({name: e.name, url: reader.result}))}

    if (file) {
      reader.readAsDataURL(file)
      setFile(file)
      dispatch(readyToUpload())
    }
  }

  const innerElement = fileInfo.url ? <img className='uploading-img' src={fileInfo.url} alt='File preview' /> : <p className='dropzone-inner-txt'><span>Drag here</span> your file or <span>Click here</span> to upload</p>

  return (
    <>
      <h3 className='upload-header'>Upload a .jpg or .png Cat Image</h3>
      <p className='upload-header-text'>Any uploads must comply with the <a href='https://thecatapi.com/privacy' target='_blank' rel="noreferrer">upload guidelines</a> or face deletion.</p>
      <FileUploader
        classes={`modal-drop-area ${isUploadError === 'error' ? 'modal-upload-error' : ''}`}
        children={innerElement}
        handleChange={handleChange}
        name='file'
        types={fileTypes} />
      <p className='upload-info'>{fileInfo.name ? `Image File Name: ${fileInfo.name}` : 'No file selected'}</p>
      <UploadBtn file={file} />
    </>
  )
}

export default DragDrop