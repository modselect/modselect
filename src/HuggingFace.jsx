import React from 'react';
import HuggingFaceImageToTextCard from './HuggingFaceImageToTextCard'
import HuggingFaceTextToTextCard from './HuggingFaceTextToTextCard'
import HuggingFaceTextToImageCard from './HuggingFaceTextToImageCard'
import HuggingFaceTextToAudioCard from './HuggingFaceTextToAudioCard'

export const HuggingFace = (props) => {
  const type = props.type
  switch (type) {
    case 'text-to-image':
      return (
        <HuggingFaceTextToImageCard model={props.model} API_KEY={props.API_KEY} />
      )
      break;
    case 'image-to-text':
      return (
        <HuggingFaceImageToTextCard model={props.model} API_KEY={props.API_KEY} />
      )
      break;
    case 'text-to-text':
      return (
        <HuggingFaceTextToTextCard model={props.model} API_KEY={props.API_KEY} />
      )
      break;
    case 'text-to-audio':
      return (
        <HuggingFaceTextToAudioCard model={props.model} API_KEY={props.API_KEY} />
      )
      break;
    default:
      return (
        <div>
          Please select a correct transformer type.
        </div>
      )
      break;
  }
}
