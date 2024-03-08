import React, { useRef} from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import whiteSquare from './white_square.jpeg';


const ImageSelector= ({ SDConfig, setSDConfig }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file) => {
        if (file && file.type.startsWith('image/')) {
            const imageString = await getBase64(file) ;
            setSDConfig({ ...SDConfig, init_images: [imageString] })
        }
    }
    const getBase64 = (file) => {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = ev => {
                resolve(ev.target?.result)
            }
            reader.readAsDataURL(file)
        })
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
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={openFileSelector}>
                    {(SDConfig.init_images.length > 0) &&
                        <img
                            width="512"
                            height="512"
                            src={SDConfig.init_images[0]}
                            alt='Input an Image' />}
                     {(SDConfig.init_images.length === 0) &&
                        <img
                            width="512"
                            height="512"
                            src={whiteSquare}
                            alt='Input an Image' />}   
                </div>
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
