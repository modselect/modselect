'use client';
import DiffusionSlider from './DiffusionSlider';
import { Button, Card, Text, Flex, Checkbox, Container, TextArea, Separator, Tabs } from '@radix-ui/themes';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import React, { useEffect, useState } from 'react';
import SamplingMethodSelector from './SamplingMethodSelector';

import CallReceivedIcon from '@mui/icons-material/CallReceived';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// import whiteSquare from './white_square.jpeg'
import * as Progress from '@radix-ui/react-progress';
import RefinerPanel from './RefinerPanel';
import HiresPanel from './HiresPanel';
import SeedPanel from './SeedPanel';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import InventoryIcon from '@mui/icons-material/Inventory';
import ImageIcon from '@mui/icons-material/Image';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const progressStyles = {
    progressRoot: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--black-a9)',
        borderRadius: '99999px',
        width: '100%',
        height: '25px',
        transform: 'translateZ(0)',
    },
    progressIndicator: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
    },
};

const Txt2ImgPanel = ({ SDConfig, setSDConfig, AppData }) => {
    const [isPolling, setIsPolling] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageOutput, setImageOutput] = useState('');

    const checkpoints = AppData.checkpoints
    const upscalerList = AppData.upscalerList
    const methods = AppData.methods
    var timer = null

    const runAPICall = async (api_path) => {
        console.log('SDConfig', SDConfig, AppData);
        startPolling()
        const thisURL = AppData.url + api_path
        const res = await fetch(thisURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(SDConfig)
        })
        const json = await res.json()
        const imageSRC = `data:image/png;base64, ${json.images[0]}`
        setImageOutput(imageSRC)
    }
    const pollingCallback = async () => {
        const res = await fetch(AppData.url + '/sdapi/v1/progress')
        const json = await res.json()
        setProgress(json.progress)
        if ((json.progress === 0) && (json.state.job_count === 0)) {
            stopPolling()
        }

    };
    const startPolling = () => {
        setIsPolling(true);
        timer = setInterval(pollingCallback, 250);
    };
    const stopPolling = () => {
        setIsPolling(false);
        clearInterval(timer);
    };
    const swapHeightAndWidth = () => {
        const oh = SDConfig.height
        setSDConfig({ ...SDConfig, height: SDConfig.width, width: oh })
    }

    return (
        <Card>
            <Flex direction={"column"} gap={"3"} width={"100%"}>
                <Flex direction={"row"} gap={"2"} justify={"between"}>
                    <Flex direction={"column"} gap={"2"} width={"100%"}>
                        <TextArea
                            placeholder="Prompt"
                            onChange={(e) => setSDConfig({ ...SDConfig, prompt: e.target.value })}
                            value={SDConfig.prompt}
                        />
                        <TextArea
                            placeholder="Negative Prompt"
                            onChange={(e) => setSDConfig({ ...SDConfig, negative_prompt: e.target.value })}
                            value={SDConfig.negative_prompt}
                        />
                    </Flex>
                    <Flex direction={"column"} gap={"2"}>
                        <Button onClick={() => runAPICall('/sdapi/v1/txt2img')} size={"3"}>
                            Generate
                        </Button>
                        <Flex direction={"row"} gap={"2"}>
                            <Button size={"1"}>
                                <CallReceivedIcon />
                            </Button>
                            <Button size={"1"}>
                                <DeleteIcon />
                            </Button>
                            <Button size={"1"}>
                                <ContentPasteIcon />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Tabs.Root className="TabsRoot" defaultValue="generation">
                    <Tabs.List className="TabsList" aria-label="Manage your account">
                        <Tabs.Trigger className="TabsTrigger" value="generation">
                            Generation
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content className="TabsContent" value="generation">
                        <Card>
                            <Flex direction={"row"} gap={"2"} width={"100%"} align={"start"}>
                                <Flex direction={"column"} gap={"4"} width={"100%"}>
                                    <Flex direction={"row"} gap={"2"} justify={"between"} align={"center"}>
                                        <SamplingMethodSelector
                                            label="Sampling method"
                                            methods={methods}
                                            onChange={(value) => setSDConfig({ ...SDConfig, sampler_name: value })}
                                            chosenMethod={SDConfig.sampler_name} />
                                        <DiffusionSlider
                                            label="Sampling Steps"
                                            min={1}
                                            max={150}
                                            value={SDConfig.steps}
                                            onUpdate={(value) => setSDConfig({ ...SDConfig, steps: value })} />
                                    </Flex>
                                    <Flex direction={"column"} gap={"2"}>
                                        <HiresPanel
                                            SDConfig={SDConfig}
                                            setSDConfig={setSDConfig}
                                            upscalerList={upscalerList} />
                                        <RefinerPanel
                                            SDConfig={SDConfig}
                                            setSDConfig={setSDConfig}
                                            checkpoints={checkpoints} />
                                    </Flex>
                                    <Flex direction={"row"} gap={"4"} justify={"between"} align={"center"}>
                                        <Flex direction={"column"} gap={"4"} width={"100%"}>
                                            <DiffusionSlider
                                                label="Width"
                                                min={64}
                                                max={2064}
                                                step={8}
                                                value={SDConfig.width}
                                                onUpdate={(value) => setSDConfig({ ...SDConfig, width: value })} />
                                            <DiffusionSlider
                                                label="Height"
                                                min={64}
                                                max={2064}
                                                step={8}
                                                value={SDConfig.height}
                                                onUpdate={(value) => setSDConfig({ ...SDConfig, height: value })} />
                                        </Flex>
                                        <Flex direction={"column"} gap={"2"} align={"center"} justify={"center"}>
                                            <Button size={"1"} onClick={swapHeightAndWidth}>
                                                <SwapVertIcon />
                                            </Button>
                                        </Flex>
                                        <Flex direction={"column"} gap={"2"} width={"100%"} align={"center"}>
                                            <DiffusionSlider
                                                label="Batch count"
                                                min={1}
                                                max={100}
                                                value={SDConfig.batch_count}
                                                onUpdate={(value) => setSDConfig({ ...SDConfig, batch_count: value })} />
                                            <DiffusionSlider
                                                label="Batch size"
                                                min={1}
                                                max={100}
                                                value={SDConfig.batch_size}
                                                onUpdate={(value) => setSDConfig({ ...SDConfig, batch_size: value })} />
                                        </Flex>
                                    </Flex>
                                    <DiffusionSlider
                                        label="CFG Scale"
                                        min={1}
                                        max={30}
                                        step={0.5}
                                        value={SDConfig.cfg_scale}
                                        onUpdate={(value) => setSDConfig({ ...SDConfig, cfg_scale: value })} />
                                    <SeedPanel
                                        SDConfig={SDConfig}
                                        setSDConfig={setSDConfig} />
                                </Flex>
                                <Separator orientation="vertical" size="4" />
                                <Flex direction={"column"} gap={"1"} width={"100%"}>
                                    <Card style={{ height: '100%', aspectRatio: '1/1' }}>
                                        <img
                                            src={(imageOutput === "") ? './white-square.jpeg' : imageOutput}
                                            alt="white square"
                                            width={512}
                                            height={512}
                                        />
                                    </Card>
                                    <Flex direction={"row"} gap={"2"} justify={"center"} align={"center"}>
                                        <Button size={"1"}>
                                            <FolderIcon />
                                        </Button>
                                        <Button size={"1"}>
                                            <SaveIcon />
                                        </Button>
                                        <Button size={"1"}>
                                            <InventoryIcon />
                                        </Button>
                                        <Button size={"1"}>
                                            <ImageIcon />
                                        </Button>
                                        <Button size={"1"}>
                                            <ColorLensIcon />
                                        </Button>
                                        <Button size={"1"}>
                                            <SquareFootIcon />
                                        </Button>
                                        <Button size={"1"}>
                                            <AutoAwesomeIcon />
                                        </Button>
                                    </Flex>
                                    <Text size={"1"}>
                                        {SDConfig.prompt}
                                    </Text>

                                    <Text size={"1"}>
                                        {`Steps: ${SDConfig.steps}, Sampler: ${SDConfig.sampler_name}, CFG Scale: ${SDConfig.cfg_scale}, Seed: ${SDConfig.seed}, Size: ${SDConfig.width}x${SDConfig.height}, Model hash:`}
                                    </Text>

                                    <Progress.Root
                                        style={{ ...progressStyles.progressRoot, display: isPolling ? 'block' : 'none' }}
                                        value={progress}
                                    >
                                        <Progress.Indicator
                                            className="ProgressIndicator"
                                            style={{
                                                ...progressStyles.progressIndicator,
                                                transform: `translateX(-${100 - progress * 100}%)`
                                            }}
                                        />
                                    </Progress.Root>
                                </Flex>
                            </Flex>
                        </Card>
                    </Tabs.Content>
                </Tabs.Root>
            </Flex>
        </Card>
    )
};

export default Txt2ImgPanel;
