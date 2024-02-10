import ImageSelector from './core/ImageSelector'
import React, { useState } from 'react'
import { Flex, Button, TextArea, Card } from '@radix-ui/themes';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import getBase64 from './core/utilities/getBase64'

const GeminiImageToTextCard = ({model, API_KEY}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const [inputImage, setInputImage] = useState(null);
    const [result, setResult] = useState("")
    const modelProvider = "Google"
    console.log('model setup', model)
    const modelName = model

    const imageChange = (v) => {
        setInputImage(v)
        setIsCleared(false)
    }

    const runButtonClicked = async () => {
        setIsLoading(true)
        setResult("")

        const genAI = new GoogleGenerativeAI(API_KEY);
        
        console.log('this is the model', modelName, API_KEY)

        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = "What’s in this image?";
        const base64Image2 = await getBase64(inputImage)
        let fixed_base_string = base64Image2.replace("data:image/jpeg;base64,","")
        const imageParts = [{
            inlineData: {
                data: fixed_base_string,
                mimeType: "image/jpeg"
            }
        }]

        const model_result = await model.generateContent([prompt, ...imageParts]);
        const response2 = await model_result.response.candidates[0].content.parts[0].text;
        
        setIsLoading(false)
        setResult(response2)
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
            <div>Provider: {modelProvider}</div>
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

export default GeminiImageToTextCard;
