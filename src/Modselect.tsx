import { Card } from '@radix-ui/themes';
import React from 'react';
import { HuggingFace } from './HuggingFace';

interface ModselectProps {
  mID: string;
  API_KEY: string;
}

interface OpenAIProps {
    API_KEY: string;
    type: string;
}

interface GeminiProps {
    API_KEY: string;
    type: string;
}

export const OpenAI: React.FC<OpenAIProps> = (props) => {
  return (
    <div>
      Modselect.OpenAI
    </div>
  )
}

export const Gemini: React.FC<GeminiProps> = (props) => {
  return (
    <div>
      Modselect.Gemini
    </div>
  )
}

const Modselect: React.FC<ModselectProps> = ({ mID, API_KEY }) => {
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

export default {
  Modselect: Modselect,
  HuggingFace: HuggingFace,
  OpenAI: OpenAI,
  Gemini: Gemini
}
