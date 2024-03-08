'use client';
import DiffusionSlider from './DiffusionSlider';
import { Button, Card, Text, Flex, Checkbox } from '@radix-ui/themes';
import React, { useState } from 'react';
import SamplingMethodSelector from './SamplingMethodSelector';

const SoftInpaintingCard = ({ SDConfig, setSDConfig }) => {
    const [showPanel, setShowPanel] = useState(false);

    const SoftInpaintingPanel = () => {
        return (
            <Flex direction={"column"} gap={"4"} width={"100%"} justify={"between"} align={"center"}>
                <Flex direction={"row"} gap={"2"} width={"100%"} align={"center"} justify={"between"}>
                    <DiffusionSlider
                        label="Schedule bias"
                        min={0}
                        max={8}
                        step={0.1}
                        value={SDConfig.hr_second_pass_steps}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_second_pass_steps: value })} />
                    <DiffusionSlider
                        label="Preservation strength"
                        min={0}
                        max={8}
                        step={0.01}
                        value={SDConfig.denoising_strength}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, denoising_strength: value })} />
                    <DiffusionSlider
                        label="Transition contrast boost"
                        min={1}
                        max={32}
                        step={0.5}
                        value={SDConfig.denoising_strength}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, denoising_strength: value })} />
                    <DiffusionSlider
                        label="Mask influence"
                        min={0}
                        max={1}
                        step={0.01}
                        value={SDConfig.hr_scale}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_scale: value })} />
                    <DiffusionSlider
                        label="Difference threshold"
                        min={0}
                        max={8}
                        step={0.25}
                        value={SDConfig.hr_scale}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_scale: value })} />
                    <DiffusionSlider
                        label="Difference contrast"
                        min={0}
                        max={8}
                        step={0.25}
                        value={SDConfig.hr_scale}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, hr_scale: value })} />
                </Flex>
                <Flex direction={"row"} gap={"2"} width={"100%"} align={"center"} justify={"between"}>
                    <DiffusionSlider
                        label="Upscale by"
                        min={1}
                        max={32}
                        step={0.5}
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
                            checked={showPanel}
                            onClick={() => setShowPanel(!showPanel)}
                        />
                        Soft inpainting
                    </Flex>
                </Text>
                {showPanel && SoftInpaintingPanel()}
            </Flex>
        </Card>
    )
}

export default SoftInpaintingCard;
