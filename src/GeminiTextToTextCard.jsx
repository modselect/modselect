import React, { useState } from 'react'
import { Flex, Button, Card, TextArea } from '@radix-ui/themes';
import PromptSelector from './core/PromptSelector'
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GeminiTextToTextCard = ({model, API_KEY}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState(null);
    const [isCleared, setIsCleared] = useState(false);
    const [result, setResult] = useState("")
    const modelName = model
    const modelProvider = "Google"

    const promptChange = (v) => {
        setPrompt(v)
    }

    const runButtonClicked = async () => {
        setIsLoading(true)
        setResult("")

        const genAI = new GoogleGenerativeAI(API_KEY);
        
        const model = genAI.getGenerativeModel({ model: modelName });
        const model_result = await model.generateContent([prompt]);
        const response2 = await model_result.response.candidates[0].content.parts[0].text;

        setIsLoading(false)
        setResult(response2)
    }

    const clearButtonClicked = async () => {
        setInputImage(null)
        setResult('')
        setIsLoading(false)
        await setIsCleared(true)
        await setIsCleared(false)
    }

    const handleResultTextAreaChange = () => {

    }

    return (
        <Card>
            <PromptSelector onChange={promptChange} isCleared={isCleared} />
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

export default GeminiTextToTextCard;
