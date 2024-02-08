import { CircularProgress } from '@mui/material';
import ImageSelector from '@/app/server/components/cards/ImageSelector'
import { useState } from 'react'
import { Button, Card, TextArea } from '@radix-ui/themes';
import { HfInference } from "@huggingface/inference";

const HuggingFaceImageToTextCard = ({model, API_KEY}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [inputImage, setInputImage] = useState(null);
    const [result, setResult] = useState("")
    const inference = new HfInference(API_KEY);

    const imageChange = (v) => {
        setInputImage(v)
    }

    const runButtonClicked = async () => {
        setIsLoading(true)
        setResult("")

        const IFresult = await inference.imageToText({
            data: inputImage,
            model: model
        })
        setIsLoading(false)
        setResult(IFresult.generated_text)
    }
    const handleResultTextAreaChange = () => {

    }

    return (
        <Card>
            <ImageSelector onChange={imageChange}/>
            {isLoading && <CircularProgress />}
            {!isLoading && <Button onClick={runButtonClicked}>
                Run
            </Button>}
            <div >
                <TextArea placeholder='Output' value={result} onChange={handleResultTextAreaChange} />
            </div>
          </Card>
    )
};

export default HuggingFaceImageToTextCard;
