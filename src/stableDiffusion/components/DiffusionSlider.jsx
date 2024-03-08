import React, { FC } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';


const DiffusionSlider = ({
    label,
    min,
    max,
    step = 1,
    value,
    onUpdate
}) => {

    const handleValueChange = (value) => {
        if (typeof value === 'number') {
            onUpdate(value);
        } else {
            onUpdate(value[0]);
        }
    };

    return (
        <Flex direction={"column"} width={"100%"} gap={"1"} >
            <Flex direction={"row"} justify={"between"} >
                <Text size="1">
                    {label}
                </Text>
                <input
                    type="number"
                    step={step}
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => handleValueChange([+e.target.value])}
                    className="border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md w-20"
                />
            </Flex>
            <Slider value={value} min={min} max={max} step={step} onChange={handleValueChange} />
        </Flex>
    )
};

export default DiffusionSlider;
