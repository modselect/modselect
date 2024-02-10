import React, { useState } from 'react'
import { Flex, Button, TextArea, Card } from '@radix-ui/themes';
import { HfInference } from "@huggingface/inference";
import PromptSelector from './core/PromptSelector'

const OpenAITextToImageCard = ({model, API_KEY}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(null)
    const inference = new HfInference(API_KEY);

    const promptChange = (v) => {
        setPrompt(v)
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
    

    const clearButtonClicked = async () => {
        setPrompt('')
        setResult(null)
        setIsLoading(false)
        await setIsCleared(true)
        await setIsCleared(false)
    }

    return (
        <Card>
            <PromptSelector onChange={promptChange} isCleared={isCleared} />
            <div>Provider: Hugging Face</div>
            <div>Model: {model}</div>
            
            {result && <img src={result} width="200" height="200" alt="an output image" />}

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

export default OpenAITextToImageCard;
