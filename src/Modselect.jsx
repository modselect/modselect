"use client"
import { Button, Card, Flex, TextArea, Text, Popover, Theme, PopoverRoot, PopoverClose, PopoverTrigger, PopoverContent, PopoverPortal, PopoverArrow  } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import ImageSelector from './core/ImageSelector';
import OutputAudio from './core/OutputAudio';
import PromptSelector from './core/PromptSelector';
import { CircularProgress } from '@mui/material';
import '@radix-ui/themes/styles.css';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const DEBUG = 0
const MODSELECT_API_URL = DEBUG ? "http://localhost:3000" : "https://modselect.com"

const getBase64 = (file) => {
  const reader = new FileReader()
  return new Promise(resolve => {
      reader.onload = ev => {
          resolve(ev.target.result)
      }
      reader.readAsDataURL(file)
  })
}


export const Modselect = ({ mID, API_KEY, debug=false }) => {
  const [solutionData, setSolutionData] = useState(null);
  const [solutionType, setSolutionType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [inputImage, setInputImage] = useState(null);
  const [result, setResult] = useState('');
  const [debugView, setDebugView] = useState(debug);

  useEffect(() => {
    getSolution().then((response) => {
      setSolutionData(response)
      setSolutionType(response.pipelineTypeId)
    })
    
  }, []);
  const getSolution = async () => {
    const url = `${MODSELECT_API_URL}/api/getDeployment`
    let result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        id: mID,
        api_key: API_KEY
      })
    })
    
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
        model: solutionData.model,
        solution: solutionData
    }

    if (solutionType==='image-to-text') {
      const base64Image2 = await getBase64(inputImage)
      cardData["input"] = base64Image2
    } else if (solutionType==='text-to-image') {
        cardData["input"] = prompt
    } else if (solutionType==='text-to-text') {
        cardData["input"] = prompt
    } else if (solutionType==='text-to-audio') {
        cardData["input"] = prompt
    }

    let modelResult = await fetch(`${MODSELECT_API_URL}/api/runSolution`, {
      method: 'POST',
      body: JSON.stringify(cardData),
    })


    if (solutionType==='image-to-text') {
      if (solutionData.model.providerId === 'OpenAI') {
        const json = await modelResult.json()
        // console.log('json', json)
        const text = json.choices[0].message.content
        setResult(text)
      }
      if (solutionData.model.providerId === 'HuggingFace') { 
        const json = await modelResult.json()
        // console.log('json', json)
        const text = json[0].generated_text
        setResult(text)
      }
    } else if (solutionType==='text-to-image') {
      const imageBlob = await modelResult.blob()
      // console.log('imageBlob', imageBlob)
      const url = URL.createObjectURL(imageBlob)
      setResult(url)
    } else if (solutionType==='text-to-text') {
      if (solutionData.model.pipelineTypeId === 'text-generation') {
        const text = await modelResult.json()
        // console.log('text', text)
        setResult(text)
      } else {
        const json = await modelResult.json()
        const text = json[0].generated_text
        setResult(text)
      }
    } else if (solutionType==='text-to-audio') {
      const audioBlob = await modelResult.blob()
      // console.log('audioBlob', audioBlob)
      const resultURL = URL.createObjectURL(audioBlob)
      setResult(resultURL)
    } 

    setIsLoading(false)
  }
  
  const imageChange = (v) => {
    setInputImage(v)
  }
  const handleTextChange = (e) => {
    
  }
  const renderDebugView = () => {
    return (
      <PopoverRoot>
        <PopoverTrigger asChild>
          <Button >
            <InfoIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent sideOffset={5}>
            <Flex gap={"1"} direction={"column"}>
              <Text>MODSELECT debug view</Text>
              <Text>mID: {mID}</Text>
              <Text>API_KEY: {API_KEY}</Text>
              <Text>SolutionType: {solutionType}</Text>
              <Text>Provider: {solutionData?.model.providerId}</Text>
              <Text>Model: {solutionData?.model.name}</Text>  
              <Text>PipelineType: {solutionData?.model.pipelineTypeId}</Text>
            </Flex>
          <PopoverClose>
            <CloseIcon />
          </PopoverClose>
        </PopoverContent>

      </PopoverRoot>
    )
  }
  return (
    <Theme>
      <Card>
          {solutionData &&
              <Card>    
                  <Flex direction={"column"} gap={"2"}>
                      {solutionType === 'image-to-text' ? <ImageSelector onChange={imageChange}/> : null}
                      {solutionType && <PromptSelector onChange={promptChange}/>}
                      {isLoading && <CircularProgress />}
                      {!isLoading && <Button onClick={runButtonClicked}>Run</Button>}
                      {solutionType === 'text-to-audio' ? <OutputAudio outputBlob={result}/> : null}
                      {solutionType === 'text-to-image' ? <img src={result} height={"250"} width={"250"} /> : null}
                      {solutionType === 'text-to-text' ? <TextArea placeholder='Output' value={result} onChange={handleTextChange}/> : null}
                      {solutionType === 'image-to-text' ? <TextArea placeholder='Output' value={result} onChange={handleTextChange}/> : null}
                  </Flex>
              </Card>
          }
          {debugView && renderDebugView()}
      </Card>
    </Theme>
  );
};