'use client';
import DiffusionSlider from './DiffusionSlider';
import { Button, Card, Text, Flex, Checkbox } from '@radix-ui/themes';
import React, { useState } from 'react';
import SamplingMethodSelector from './SamplingMethodSelector';

const HiresPanel = ({ SDConfig, setSDConfig, upscalerList }) => {
    const [showHires, setShowHires] = useState(false);

    const HiresPanelCard = () => {
        return (
            <Flex direction={"column"} gap={"4"} width={"100%"} justify={"between"} align={"center"}>
                <Flex direction={"row"} gap={"2"} width={"100%"} align={"center"} justify={"between"}>
                    <SamplingMethodSelector
                        label="Upscaler"
                        methods={upscalerList}
                        onChange={(value) => setSDConfig({ ...SDConfig, hr_upscaler: value })}
                        chosenMethod={SDConfig.hr_upscaler} />
                    <DiffusionSlider
                        label="Hires steps"
                        min={0}
                        max={150}
                        step={1}
                        value={SDConfig.hr_second_pass_steps}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_second_pass_steps: value })} />
                    <DiffusionSlider
                        label="Denoising strength"
                        min={0}
                        max={1}
                        step={0.01}
                        value={SDConfig.denoising_strength}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, denoising_strength: value })} />
                </Flex>
                <Flex direction={"row"} gap={"2"} width={"100%"}  align={"center"} justify={"between"}>
                    <DiffusionSlider
                        label="Upscale by"
                        min={1}
                        max={4}
                        step={0.05}
                        value={SDConfig.hr_scale}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_scale: value })} />
                    <DiffusionSlider
                        label="Resize width to"
                        min={0}
                        max={2048}
                        step={1}
                        value={SDConfig.hr_resize_x}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_resize_x: value })} />
                    <DiffusionSlider
                        label="Resize height to"
                        min={0}
                        max={2048}
                        step={1}
                        value={SDConfig.hr_resize_y}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_resize_y: value })} />
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
                            checked={showHires}
                            onClick={() => setShowHires(!showHires)}
                        />
                        Hires. fix
                    </Flex>
                </Text>
                {showHires && HiresPanelCard()}
            </Flex>
        </Card>
    )
}

export default HiresPanel;
