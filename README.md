# Modselect

Modselect is No Code AI Solution Platform.  Visit www.modselect.com for more information.

Modselect simplifies the usage of AI models, providing a convenient way to interact with models and implement AI solutions into your website or application.

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