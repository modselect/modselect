import { TextField } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react'

const PromptSelector = ({onChange, isCleared}) => {
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        if (isCleared) {
            setPrompt('')
        }
      })

    const handlePromptChange = (e) => {
        setPrompt(e.target.value)
        onChange(e.target.value)
    }

    return (
        <div>
            <TextField.Root>
            <TextField.Input placeholder="Enter Your Prompt…" onChange={handlePromptChange} value={prompt} />
          </TextField.Root>
        </div>
    )
};

export default PromptSelector;
