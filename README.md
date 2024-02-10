# Modselect

Modselect is an npm package that simplifies the usage of various AI models, including ChatGPT, Gemini and models available on Hugging Face. It provides a convenient way to interact with models for tasks like image-to-text conversion, text-to-text generation, text-to-audio, and text-to-image.

The library is built on radix-ui, and currently has only been tested with Next.js.

## Usage

### Installation
```bash
npm install modselect
```

### Import
```javascript
import { HuggingFace, Gemini } from "modselect"
```

### Hugging Face
```javascript
<HuggingFace 
    type="image-to-text"
    API_KEY={HF_KEY}
    model="Salesforce/blip-image-captioning-large" />

<HuggingFace 
    type="text-to-text"
    API_KEY={HF_KEY}
    model="openai-community/gpt2" />

<HuggingFace 
    type="text-to-audio"
    API_KEY={HF_KEY}
    model="facebook/mms-tts-eng" />

<HuggingFace 
    type="text-to-image"
    API_KEY={HF_KEY}
    model="cagliostrolab/animagine-xl-3.0" />
```

### Google/Gemini
```javascript
<Gemini 
    type="image-to-text"
    API_KEY={GOOGLE_AI_KEY}
    model="gemini-pro-vision"/>
```


## Usage
Currently only Gemini and Hugging Face modules are working, OpenAI is still under development.