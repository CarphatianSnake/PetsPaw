import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import '../gallery.scss'

const fileTypes = ['JPG', 'PNG'];

const DragDrop = () => {

  const [file, setFile] = useState(null)
  const handleChange = file => {
    setFile(file)
  }

  console.log(file);

  const innerElement = file ? <img src={file} /> : <p className='dropzone-inner-txt'><span>Drag here</span> your file or <span>Click here</span> to upload</p>

  return (
    <>
      <h3 className='upload-header'>Upload a .jpg or .png Cat Image</h3>
      <p className='upload-header-text'>Any uploads must comply with the <span>upload guidelines</span> or face deletion.</p>
      <FileUploader
        classes='modal-drop-area'
        children={innerElement}
        handleChange={handleChange}
        name='file'
        types={fileTypes} />
      <p className='upload-info'>{file ? `Image File Name: ${file.name}` : 'No file selected'}</p>
    </>
  )
}

export default DragDrop