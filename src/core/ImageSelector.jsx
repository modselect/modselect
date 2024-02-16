import React, { useRef, useState, useEffect } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import whiteSquare from './white_square.jpeg'

const ImageSelector = ({onChange, isCleared}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
      if (isCleared) {
        setSelectedImage(null)
        setImageFile(null)
      }
    })

    const imageLoaded = async(e) => {
        // console.log('image loaded', e )
    }

    const handleFile = async (file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
            await setImageFile(file)
            onChange(file)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file)
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e) => {
            const file = e.target.files[0];
            handleFile(file)
        }

    const openFileSelector = () => {
        if (fileInputRef && fileInputRef.current) {
        fileInputRef.current.click();
        }
    };

    return (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {selectedImage ? (
                    <div>
                      <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onClick={openFileSelector}>
                          <img 
                            width="200" 
                            height="200" 
                            src={selectedImage} 
                            alt='Input an Image' onLoad={imageLoaded}/>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={openFileSelector}
                    >
                      <img 
                        width="200" 
                        height="200" 
                        src={whiteSquare} 
                        alt='Input an Image hello'/>
                      <AddPhotoAlternateOutlinedIcon />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    hidden
                    onChange={handleFileInputChange}
                  />
                </div>
              </div>
    )
};

export default ImageSelector;
