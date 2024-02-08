import Image from 'next/image'
import { useRef, useState } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import whiteSquare from './white_square.jpeg'
import { Card } from '@radix-ui/themes';

const ImageSelector = ({onChange}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

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
                          
                          <Image
                          
                          width="200" height="200"
                          src={selectedImage}
                          alt="Selected"
                          // className="w-200 h-200 bg-gray-200 border border-dashed border-gray-400 p-2"
                          onLoad={imageLoaded}
                          />
                      </div>
                    </div>
                  ) : (
                    <Card>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={openFileSelector}
                    >
                      <Image 
                        width="200" height="200"
                        src={whiteSquare}
                        priority
                        alt="Input an Image"
                        
                        />

                      <AddPhotoAlternateOutlinedIcon />
                    </div>
                    </Card>
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
