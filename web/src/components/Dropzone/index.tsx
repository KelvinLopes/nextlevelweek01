import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {

  const [selecteFileUrl, setSelecteFileUrl] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelecteFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />

      {
        selecteFileUrl
            ? <img src={selecteFileUrl} alt = "Imagem do estabelecimento" />
            : (
              <p>  <FiUpload /> Clique ou arraste a imagem do estabelecimento</p>
             )      
      }
    {/*
      {
        isDragActive ?
          <p>  <FiUpload /> Solte a imagem do estabelecimento aqui ...</p> :
          <p>  <FiUpload /> Clique ou arraste a imagem do estabelecimento</p>
      }
    */}
    </div>
  )
}

export default Dropzone;