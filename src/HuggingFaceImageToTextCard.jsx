import ImageSelector from './core/ImageSelector'
import React, { useState } from 'react'
import { Flex, Button, TextArea, Card } from '@radix-ui/themes';
import { HfInference } from "@huggingface/inference";

const HuggingFaceImageToTextCard = ({model, API_KEY}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const [inputImage, setInputImage] = useState(null);
    const [result, setResult] = useState("")
    const inference = new HfInference(API_KEY);

    const imageChange = (v) => {
        setInputImage(v)
        setIsCleared(false)
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

    const clearButtonClicked = async () => {
        setInputImage(null)
        setResult('')
        setIsLoading(false)
        await setIsCleared(true)
        await setIsCleared(false)
    }

    return (
        <Card>
            <ImageSelector onChange={imageChange} isCleared={isCleared} />
            <div>Provider: Hugging Face</div>
            <div>Model: {model}</div>

            <TextArea placeholder='Output' value={result} onChange={handleResultTextAreaChange} />
            <Flex direction="row" justify="between">
                <Button variant="outline" onClick={clearButtonClicked}>
                    Clear
                </Button>
                {isLoading && (<div>Loading...</div>)}
                {!isLoading && <Button onClick={runButtonClicked}>
                    Run
                </Button>}
            </Flex>
        </Card>
    )
};

export default HuggingFaceImageToTextCard;
