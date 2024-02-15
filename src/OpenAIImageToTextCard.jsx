import ImageSelector from './core/ImageSelector'
import React, { useState } from 'react'
import { Flex, Button, TextArea, Card } from '@radix-ui/themes';
import OpenAI from "openai";
import getBase64 from './core/utilities/getBase64'

const OpenAIImageToTextCard = ({model, API_KEY}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const [inputImage, setInputImage] = useState(null);
    const [result, setResult] = useState("")

    const imageChange = (v) => {
        setInputImage(v)
        setIsCleared(false)
    }

    const runButtonClicked = async () => {
        setIsLoading(true)
        setResult("")

        // const openai = new OpenAI({apiKey: API_KEY});
        // const base64Image = await getBase64(inputImage)
        // const response = await openai.chat.completions.create({
        //     model: model,
        //     messages: [
        //     {
        //         role: "user",
        //         content: [
        //         { type: "text", text: "What’s in this image?" },
        //         {
        //             type: "image_url",
        //             image_url: {
        //                 "url": base64Image
        //             },
        //         },
        //         ],
        //     },
        //     ],
        // });
        // const responseString = response.choices[0].message.content

        // setIsLoading(false)
        // setResult(responseString)
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

export default OpenAIImageToTextCard;
