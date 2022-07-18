import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "react-drag-drop-files";

import { uploadedFile } from '../gallerySlice'

import '../gallery.scss'

const fileTypes = ['JPG', 'PNG'];

const DragDrop = () => {

  const dispatch = useDispatch()
  const fileInfo = useSelector(state => state.gallerySlice.uploadedFile)

  const handleChange = e => {
    const file = e
    dispatch(uploadedFile({url: e.name}))
    const reader = new FileReader()
    reader.onloadend = () => {dispatch(uploadedFile({name: e.name, url: reader.result}))}

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const innerElement = fileInfo.url ? <img className='uploading-img' src={fileInfo.url} /> : <p className='dropzone-inner-txt'><span>Drag here</span> your file or <span>Click here</span> to upload</p>

  return (
    <>
      <h3 className='upload-header'>Upload a .jpg or .png Cat Image</h3>
      <p className='upload-header-text'>Any uploads must comply with the <a href='https://thecatapi.com/privacy' target='_blank'>upload guidelines</a> or face deletion.</p>
      <FileUploader
        classes='modal-drop-area'
        children={innerElement}
        handleChange={handleChange}
        name='file'
        types={fileTypes} />
      <p className='upload-info'>{fileInfo.name ? `Image File Name: ${fileInfo.name}` : 'No file selected'}</p>
    </>
  )
}

export default DragDrop