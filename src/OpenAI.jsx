import React from 'react';
import OpenAIImageToTextCard from './OpenAIImageToTextCard'

export const OpenAI = (props) => {
  const type = props.type
  switch (type) {
    // case 'text-to-image':
    //   return (
    //     <HuggingFaceTextToImageCard model={props.model} API_KEY={props.API_KEY} />
    //   )
    //   break;
    case 'image-to-text':
      return (
        // <OpenAIImageToTextCard model={props.model} API_KEY={props.API_KEY} />
        <div>OpenAI Image To Text</div>
      )
      break;
    // case 'text-to-text':
    //   return (
    //     <HuggingFaceTextToTextCard model={props.model} API_KEY={props.API_KEY} />
    //   )
    //   break;
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