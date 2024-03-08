'use client';

import { Flex, Container, Tabs, Theme, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import SamplingMethodSelector from './components/SamplingMethodSelector';
import Txt2ImgPanel from './components/Txt2ImgPanel'
import Img2ImgPanel from './components/Img2ImgPanel'
import '@radix-ui/themes/styles.css';

import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

let methods = [
    "DPM++ 2M Karras",
    "DPM++ SDE Karras",
    "DPM++ 2M SDE Exponential",
    "DPM++ 2M SDE Karras",
    "Euler a",
    "Euler",
    "LMS",
    "Heun",
    "DPM2",
    "DPM2 a",
    "DPM++ 2S a",
    "DPM++ 2M",
    "DPM++ SDE",
    "DPM++ 2M SDE",
    "DPM++ 2M SDE Heun",
    "DPM++ 2M SDE Heun Karras",
    "DPM++ 2M SDE Heun Exponential",
    "DPM++ 3M SDE",
    "DPM++ 3M SDE Karras",
    "DPM++ 3M SDE Exponential",
    "DPM fast",
    "DPM adaptive",
    "LMS Karras",
    "DPM2 Karras",
    "DPM2 a Karras",
    "DPM++ 2S a Karras",
    "Restart",
    "DDIM",
    "PLMS",
    "UniPC",
    "LCM"
];

let upscalerList = [
    "Latent",
    "Latent (antialiased)",
    "Latent (bicubic)",
    "Latent (bicubic antialiased)",
    "Latent (nearest)",
    "Latent (nearest-exact)",
    "None",
    "Lanczos",
    "Nearest",
    "DAT x2",
    "DAT x3",
    "DAT x4",
    "ESRGAN_4x",
    "LDSR",
    "R-ESRGAN 4x+",
    "R-ESRGAN 4x+ Anime6B",
    "ScuNET GAN",
    "ScuNET PSNR",
    "SwinIR 4x"
];

const checkpoints = [
    "sd-v1-4.ckpt [fe4efff1e1]",
    "v1-5-pruned.ckpt [e1441589a6]"
]


const initialSDConfig = {
    prompt: "",
    negative_prompt: "",
    checkpoint: checkpoints[0], // Assuming 'checkpoints' is defined in your component or context

    sampler_name: methods[0], // Assuming 'methods' is defined in your component or context

    height: 512,
    width: 512,
    steps: 10,
    batch_count: 1,
    batch_size: 1,
    cfg_scale: 7.5,

    hr_scale: 2,
    hr_upscaler: upscalerList[0],
    hr_second_pass_steps: 20,
    hr_resize_x: 0,
    hr_resize_y: 0,
    denoising_strength: 0.7,

    refiner_checkpoint: checkpoints[0],
    refiner_switch_at: 0.8,

    seed: -1,
    subseed: -1,
    subseed_strength: 0,
    seed_resize_from_h: 0,
    seed_resize_from_w: 0,
    init_images: [],
    resize_mode: 0

};

const initialAppData = {
    isPolling: false,
    url: "http://127.0.0.1:7860",
    progress: 0,
    imageOutput: "",
    checkpoints: checkpoints,
    upscalerList: upscalerList,
    methods: methods
}

export const StableDiffusionUI = () => {
    const [AppData, setAppData] = useState(initialAppData);
    const [SDConfig, setSDConfig] = useState(initialSDConfig);

    return (
        <Theme>
            <Container className="w-full">
                <Flex direction={"column"} gap={"2"}>
                    <Flex direction={"row"} width={"100%"} align={"center"} gap={"2"}>
                        <SettingsEthernetIcon height="16" width="16" />
                        <TextField.Root>
                            <TextField.Slot>

                            </TextField.Slot>
                            <TextField.Input value={AppData.url} onChange={(e) => setAppData({ ...AppData, url: e.target.value })} width={"100%"} />
                        </TextField.Root>
                    </Flex>
                    <Flex direction={"row"} gap={"2"} width={"100%"}>
                        <SamplingMethodSelector
                            label="Stable Diffusion checkpoint"
                            methods={checkpoints}
                            onChange={(value) => setSDConfig({ ...SDConfig, checkpoint: value })}
                            chosenMethod={SDConfig.checkpoint} />
                    </Flex>
                    <Tabs.Root className="TabsRoot" defaultValue="txt2img">
                        <Tabs.List className="TabsList" aria-label="txt2img">
                            <Tabs.Trigger className="TabsTrigger" value="txt2img">
                                txt2img
                            </Tabs.Trigger>
                            <Tabs.Trigger className="TabsTrigger" value="img2img">
                                img2img
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content className="TabsContent" value="txt2img">
                            <Txt2ImgPanel
                                SDConfig={SDConfig}
                                setSDConfig={setSDConfig}
                                AppData={AppData}
                            />
                        </Tabs.Content>
                        <Tabs.Content className="TabsContent" value="img2img">
                            <Img2ImgPanel
                                SDConfig={SDConfig}
                                setSDConfig={setSDConfig}
                                AppData={AppData}
                            />
                        </Tabs.Content>
                    </Tabs.Root>
                </Flex>
            </Container >
        </Theme>
    )
};