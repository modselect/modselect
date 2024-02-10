import React from 'react';
import GeminiImageToTextCard from './GeminiImageToTextCard';
import GeminiTextToTextCard from './GeminiTextToTextCard';

export const Gemini = (props) => {
  const type = props.type
  switch (type) {
    // case 'text-to-image':
    //   return (
    //     <HuggingFaceTextToImageCard model={props.model} API_KEY={props.API_KEY} />
    //   )
    //   break;
    case 'image-to-text':
      return (
        <GeminiImageToTextCard model={props.model} API_KEY={props.API_KEY} />
      )
      break;
    case 'text-to-text':
      return (
        <GeminiTextToTextCard model={props.model} API_KEY={props.API_KEY} />
      )
      break;
    // case 'text-to-audio':
    //   return (
    //     <HuggingFaceTextToAudioCard model={props.model} API_KEY={props.API_KEY} />
    //   )
    //   break;
    default:
      return (
        <div>
          Please select a correct transformer type.
        </div>
      )
      break;
  }
}