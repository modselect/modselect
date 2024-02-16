"use client"
import { Theme } from '@radix-ui/themes';
import { Button, Card, Flex, TextArea } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import ImageSelector from './core/ImageSelector';
import OutputAudio from './core/OutputAudio';
import PromptSelector from './core/PromptSelector';
import { CircularProgress } from '@mui/material';
import { runCardModel } from './core/ModelController';
import '@radix-ui/themes/styles.css';

const MODSELECT_URL = "modselect.com"

export const Modselect = ({ mID, API_KEY }) => {
  const [solutionData, setSolutionData] = useState(null);
  const [solutionType, setSolutionType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [inputImage, setInputImage] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    getSolution().then((response) => {
      setSolutionData(response)
      setSolutionType(response.pipelineTypeId)
    })
    
  }, []);
  const getSolution = async () => {
    let result = await fetch(`https://${MODSELECT_URL}/api/solutions?id=` + mID)
    const json = await result.json()
    return json
  }
  const promptChange = (v) => {
    setPrompt(v)
  }
  const runButtonClicked = async () => {
    setIsLoading(true)
    setResult("")

    let cardData = {
        model: solutionData.model
    }

    if (solutionType==='image-to-text') {
        cardData["input"] = inputImage
    } else if (solutionType==='text-to-image') {
        cardData["input"] = prompt
    } else if (solutionType==='text-to-text') {
        cardData["input"] = prompt
    } else if (solutionType==='text-to-audio') {
        cardData["input"] = prompt
    }
    let modelResult = await runCardModel(cardData)
    setResult(modelResult)

    setIsLoading(false)
  }
  
  const imageChange = (v) => {
    setInputImage(v)
  }
  const handleTextChange = (e) => {
    
  }
  
  return (
    <Theme>
      <Card>
        MODSELECT
        <div>
          <p>mID: {mID}</p>
          <p>API_KEY: {API_KEY}</p>
          {solutionData &&
              <Card>    
                  <Flex direction={"column"} gap={"2"}>
                      {solutionType === 'image-to-text' ? <ImageSelector onChange={imageChange}/> : null}
                      {solutionType && <PromptSelector onChange={promptChange}/>}
                      {isLoading && <CircularProgress />}
                      {!isLoading && <Button onClick={runButtonClicked}>Run</Button>}
                      {solutionType === 'text-to-audio' ? <OutputAudio outputBlob={result}/> : null}
                      {solutionType === 'text-to-image' ? <ImageSelector /> : null}
                      {solutionType === 'text-to-text' ? <TextArea placeholder='Output' value={result} onChange={handleTextChange}/> : null}
                      {solutionType === 'image-to-text' ? <TextArea placeholder='Output' value={result} onChange={handleTextChange}/> : null}
                          <Flex>
                              {/* Model: {solutionData ? solutionData.model.name : ""} */}
                          </Flex>
                  </Flex>
              </Card>
          }
        </div>
      </Card>
    </Theme>
  );
};