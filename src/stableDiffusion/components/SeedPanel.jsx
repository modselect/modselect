'use client';
import DiffusionSlider from './DiffusionSlider';
import { Button, Card, Text, Flex, Checkbox } from '@radix-ui/themes';
import React, { useState } from 'react';
import SamplingMethodSelector from './SamplingMethodSelector';
import CasinoIcon from '@mui/icons-material/Casino';
import RecyclingIcon from '@mui/icons-material/Recycling';

const SeedPanel = ({ SDConfig, setSDConfig }) => {
    const [showExtra, setShowExtra] = useState(false);

    const panelCard = () => {
        return (
            <Flex direction={"column"} gap={"4"} width={"100%"} >
                <Flex direction={"row"} gap={"4"} align={"center"} justify={"between"}>
                    <Flex direction={"row"} align={"end"} gap={"2"} width={"100%"}>
                        <Flex direction={"column"} gap={"0"} width={"100%"} >
                            <Text size="1">
                                {"Variation seed"}
                            </Text>
                            <input
                                type='number'
                                value={SDConfig.subseed}
                                onChange={(e) => setSDConfig({ ...SDConfig, subseed: +e.target.value })} />
                        </Flex>
                        <Button size="1">
                            <CasinoIcon />
                        </Button>
                        <Button size="1">
                            <RecyclingIcon />
                        </Button>
                    </Flex>
                    <DiffusionSlider
                        label="Variation strength"
                        min={0}
                        max={1}
                        step={0.01}
                        value={SDConfig.subseed_strength}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, subseed_strength: value })} />
                </Flex>
                <Flex direction={"row"} gap={"4"} align={"end"} justify={"center"}>
                    <DiffusionSlider
                        label="Resize seed from width"
                        min={0}
                        max={2048}
                        step={8}
                        value={SDConfig.seed_resize_from_w}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, seed_resize_from_w: value })} />
                    <DiffusionSlider
                        label="Resize seed from height"
                        min={0}
                        max={2048}
                        step={8}
                        value={SDConfig.seed_resize_from_h}
                        onUpdate={(value) => setSDConfig({ ...SDConfig, seed_resize_from_h: value })} />
                </Flex>
            </Flex>
        )
    }
    return (
        <Card>
            <Flex direction={"column"} gap={"4"} width={"100%"} >
                <Flex direction={"row"} gap={"4"} align={"end"} justify={"between"}>
                    <Flex direction={"column"} gap={"0"} width={"100%"}>
                        <Text size="1">
                            {"Seed"}
                        </Text>
                        <Flex direction={"row"} gap={"2"} justify={"between"} align={"center"}>
                            <Flex direction={"row"} gap={"2"} width={"100%"}>
                                <Flex direction={"column"} gap={"0"} width={"100%"}>
                                    <input
                                        type='number'
                                        value={SDConfig.seed}
                                        onChange={(e) => setSDConfig({ ...SDConfig, seed: +e.target.value })} />
                                </Flex>
                                <Button size="1">
                                    <CasinoIcon />
                                </Button>
                                <Button size="1">
                                    <RecyclingIcon />
                                </Button>
                            </Flex>
                            <Flex gap="2" align={"center"} justify={"end"}>
                                <Checkbox
                                    checked={showExtra}
                                    onClick={() => setShowExtra(!showExtra)}
                                />
                                <Text as="label" size="1">
                                    Extra
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                {showExtra && panelCard()}
            </Flex>
        </Card >

    )
}

export default SeedPanel;
