import { Flex, Select, Text } from '@radix-ui/themes';
import React, { FC } from 'react';

const SamplingMethodSelector = ({
    label,
    methods,
    onChange,
    chosenMethod,
}) => {

    const handleSelectChange = (v) => {
        onChange(v);
    };

    return (
        <Flex direction="column"  width={"100%"}>
             <Text size="1">
                {label}
            </Text>
            <Select.Root
                onValueChange={handleSelectChange}
                value={chosenMethod || methods[0]}
                size="2"
            >
                <Select.Trigger />
                <Select.Content position="popper">
                    {methods.map((item, index) => (
                        <Select.Item key={index} value={item}>
                            {item}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Flex>
    );
};

export default SamplingMethodSelector;
