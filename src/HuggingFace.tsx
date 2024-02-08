import React from 'react';
import HuggingFaceImageToTextCard from './HuggingFaceImageToTextCard'

interface HuggingFaceProps {
    API_KEY: string;
    type: string;
    model: string;
}

export const HuggingFace: React.FC<HuggingFaceProps> = (props) => {
  const type = props.type
  switch (type) {
    case 'text-to-image':
      return (
        <div>
          Modselect.HuggingFace.{type}
        </div>
      )
      break;
    case 'image-to-text':
      return (
          <HuggingFaceImageToTextCard model={props.model} API_KEY={props.API_KEY} />
      )
      break;
    case 'text-to-text':
      return (
        <div>
          Modselect.HuggingFace.{type}
        </div>
      )
      break;
    case 'text-to-audio':
      return (
        <div>
          Modselect.HuggingFace.{type}
        </div>
      )
      break;
    default:
      return (
        <div>
          Modselect.HuggingFace.{type}
        </div>
      )
      break;
  }
}
