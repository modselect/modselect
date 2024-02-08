# Modselect

Modselect is an npm package that simplifies the usage of various AI models, including ChatGPT, Gemini and models available on Hugging Face. It provides a convenient way to interact with models for tasks like image-to-text conversion, text-to-text generation, text-to-audio, and text-to-image.

## Usage

### Installation
```bash
npm install modselect
```

### Import
```javascript
import Modselect from 'modselect';
```

### Hugging Face
```javascript
<Modselect.HuggingFace 
    type="image-to-text"
    API_KEY="hf_apiKey" 
    model="Salesforce/blip-image-captioning-large" />
```
