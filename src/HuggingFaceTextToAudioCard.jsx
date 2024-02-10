import React, { useState } from 'react'
import { Flex, Button, TextArea, Card } from '@radix-ui/themes';
import { HfInference } from "@huggingface/inference";
import PromptSelector from './core/PromptSelector'

const HuggingFaceTextToAudioCard = ({model, API_KEY}) => {
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

        const response = await fetch(
            `https://api-inference.huggingface.co/models/${model}`,
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
                method: "POST",
                body: JSON.stringify({"inputs": prompt}),
            }
        );
        let byteBlob = await response.blob()
        const audioURL = URL.createObjectURL(byteBlob)

        setIsLoading(false)
        setResult(audioURL)
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
            
            <div style={{display: 'flex', height: '200px', width:'200px', verticalAlign: "middle", padding: "10px"}}>
                <audio controls src={result} autoPlay></audio>
            </div>

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

export default HuggingFaceTextToAudioCard;
