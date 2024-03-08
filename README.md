# Modselect

Modselect is No Code AI Solution Platform.  Visit www.modselect.com for more information.

Modselect simplifies the usage of AI models, providing a convenient way to interact with models and implement AI solutions into your website or application.

### UPDATES:

**v0.0.17** - Stable Diffusion UI has been added.

**v0.0.14** - Support for Google Gemini API has been added, using the @google/generative-ai library.  This is not using the newer Vertex AI API, but instead the previous library version.  Support for Google's Vertex AI API will be in a future version of modselect.

**v0.0.13** - you can now use your Hugging Face and OpenAI keys with yous custom solution.  Visit the Solution Builder at www.modselect.com and assign your own API key to your solution deployment.

## Usage

### Installation
```bash
npm install modselect

pnpm install modselect

yarn add modselect
```

### Import
```javascript
import { Modselect } from "modselect"
```
### Custom Solution Implementation
In order to use the Modselect library Solution tag, you must first create a Solution and Deployment in the WebUI.  Use the mID and API_KEY from your saved deployment and place this tag in your website/app.  Optionally, a debug tag is available which provides a simple popover for viewing Solution information.
```javascript
<Modselect mID={mID} API_KEY={API_KEY} />
<Modselect mID={mID} API_KEY={API_KEY} debug />
```

## Stable Diffusion
```javascript
import { StableDiffusionUI } from "modselect"
<StableDiffusionUI  />
```


## Development Mode

The library also contains a developmet mode providing easy to use UI for Hugging Face and Gemini.  

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
***Google/Gemini development mode is currently not supported given the recent change to Vertex AI***
```javascript
<Gemini 
    type="image-to-text"
    API_KEY={GOOGLE_AI_KEY}
    model="gemini-pro-vision"/>

<Gemini 
    type="text-to-text"
    API_KEY={GOOGLE_AI_KEY}
    model="gemini-pro"/>
```