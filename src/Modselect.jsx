import { Card } from '@radix-ui/themes';
import React from 'react';
import { HuggingFace } from './HuggingFace';

const OpenAI = (props) => {
  return (
    <div>
      Modselect.OpenAI
    </div>
  )
}

const Gemini = (props) => {
  return (
    <div>
      Modselect.Gemini
    </div>
  )
}

const Modselect = ({ mID, API_KEY }) => {
  return (
    <Card>
      MODSELECT
      <div>
        <p>mID: {mID}</p>
        <p>API_KEY: {API_KEY}</p>
      </div>
    </Card>
  );
};

export { Modselect } 
export { HuggingFace }
export { OpenAI }
export { Gemini } 
  