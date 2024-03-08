'use client';
import DiffusionSlider from './DiffusionSlider';
import { Button, Card, Text, Flex, Checkbox } from '@radix-ui/themes';
import SamplingMethodSelector from './SamplingMethodSelector';
import CachedIcon from '@mui/icons-material/Cached';
import React, { useState } from 'react';

const RefinerPanel = ({ checkpoints, setSDConfig, SDConfig, refresh }) => {
    const [showRefiner, setShowRefiner] = useState(false);
    const panelCard = () => {
        return (
            <Flex direction={"column"} gap={"4"} width={"100%"}>
                <Flex direction={"row"} gap={"2"} width={"100%"} justify={"between"} align={"center"}>
                    <Flex direction={"column"} gap={"2"} width={"100%"}>
                        <SamplingMethodSelector
                            label="Checkpoint"
                            methods={checkpoints}
                            onChange={(value) => setSDConfig({ ...SDConfig, refiner_checkpoint: value })}
                            chosenMethod={SDConfig.refiner_checkpoint} />
                    </Flex>
                    <Flex direction={"column"} gap={"2"}>
                        <Button onClick={refresh} size={"1"}>
                            <CachedIcon />
                        </Button>
                    </Flex>
                    <Flex direction={"column"} gap={"2"} width={"100%"}>
                        <DiffusionSlider
                            label="Denoising strength"
                            min={0.01}
                            max={1}
                            step={0.01}
                            value={SDConfig.refiner_switch_at}
                            onUpdate={(value) => setSDConfig({ ...SDConfig, refiner_switch_at: value })} />
                    </Flex>
                </Flex>
            </Flex>
        )
    }
    return (
        <Card>
            <Flex direction={"column"} gap={"2"} width={"100%"}>
                <Text as="label" size="2">
                    <Flex gap="2">
                        <Checkbox
                            checked={showRefiner}
                            onClick={() => setShowRefiner(!showRefiner)}
                        />
                        Refiner
                    </Flex>
                </Text>
                {showRefiner && panelCard()}
            </Flex>
        </Card>
    )

}

export default RefinerPanel;
