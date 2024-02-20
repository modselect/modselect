import { HfInference } from "@huggingface/inference";
// import OpenAI from "openai";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const HF_TOKEN = "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"

const getBase64 = (file) => {
    const reader = new FileReader()
    return new Promise(resolve => {
        reader.onload = ev => {
            resolve(ev.target.result)
        }
        reader.readAsDataURL(file)
    })
}


export const runCardModel = async (cardData) => {
    console.log('cardData', cardData)
    
    const modelName = cardData.model.name
    const pipelineType = cardData.model.pipelineTypeId
    const modelProvider = cardData.model.providerId

    switch (modelProvider) {
        case "HuggingFace":
                console.log(cardData.model.providerId)
                console.log(cardData.model.pipelineTypeId)
                const inference = new HfInference(HF_TOKEN);

                if (pipelineType === 'image-to-text') {
                    
                    const IFresult = await inference.imageToText({
                        data: cardData.input,
                        model: modelName
                    })
                    
                    return IFresult.generated_text

                } else if (pipelineType === 'text-to-image') {

                    const IFresult = await inference.textToImage({
                        data: cardData.input,
                        model: modelName
                    })
                    
                    return URL.createObjectURL(IFresult)

                } else if (pipelineType === 'text-generation') {

                } else if (pipelineType === 'text-to-speech') {
                    
                    const response = await fetch(
                        `https://api-inference.huggingface.co/models/${modelName}`,
                        {
                            headers: { Authorization: `Bearer ${HF_TOKEN}` },
                            method: "POST",
                            body: JSON.stringify({"inputs": cardData.input}),
                        }
                    );
                    let byteBlob = await response.blob()
                    const audioURL = URL.createObjectURL(byteBlob)

                    return audioURL

                }
                    
            break;
        // case "OpenAI":
        //     console.log('OpenAI', pipelineType, process.env)
        //     const openai = new OpenAI({apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true});

        //     const base64Image = await getBase64(cardData.input)
        //     const response = await openai.chat.completions.create({
        //         model: modelName,
        //         messages: [
        //         {
        //             role: "user",
        //             content: [
        //             { type: "text", text: "What’s in this image?" },
        //             {
        //                 type: "image_url",
        //                 image_url: {
        //                     "url": base64Image
        //                 },
        //             },
        //             ],
        //         },
        //         ],
        //     });
        //     return response.choices[0].message.content

        //     break;
        case "Google":
            let key = "None"
            
            console.log("google AI key", key)

            const genAI = new GoogleGenerativeAI(key);

            const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

            const prompt = "What’s in this image?";
            const base64Image2 = await getBase64(cardData.input)
            let fixed_base_string = base64Image2.replace("data:image/jpeg;base64,","")
            const imageParts = [{
                inlineData: {
                    data: fixed_base_string,
                    mimeType: "image/jpeg"
                }
            }]

            const result = await model.generateContent([prompt, ...imageParts]);
            console.log('result', result)
            const response2 = await result.response.candidates[0].content.parts[0].text;
            console.log('text', response2)
            return response2

            break;
        default:
            console.error('cannot run model', cardData.model.provider.name)
    }

};

