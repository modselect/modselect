import React, { useState } from 'react'
import { Flex, Button, Card } from '@radix-ui/themes';
import { HfInference } from "@huggingface/inference";
import PromptSelector from './core/PromptSelector'

const HuggingFaceTextToTextCard = ({model, API_KEY}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState(null);
    const [isCleared, setIsCleared] = useState(false);
    const [result, setResult] = useState("")
    const inference = new HfInference(API_KEY);

    const promptChange = (v) => {
        setPrompt(v)
    }

    const runButtonClicked = async () => {
        setIsLoading(true)
        setResult("")

        const IFresult = await inference.textGeneration({
            inputs: prompt,
            model: model
        })
        setIsLoading(false)
        setResult(IFresult.generated_text)
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
            <PromptSelector onChange={promptChange} isCleared={isCleared} />
            <div>Provider: Hugging Face</div>
            <div>Model: {model}</div>

            <PromptSelector onChange={promptChange} />
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

export default HuggingFaceTextToTextCard;
