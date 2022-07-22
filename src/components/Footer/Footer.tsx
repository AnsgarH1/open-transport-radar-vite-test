import {Center, Text, useColorModeValue} from '@chakra-ui/react'
import React from 'react'

function Footer() {
    return (
        <Center h={{md:"3rem", base:"1.3rem"}} width="full" bgColor={useColorModeValue("gray.200", "gray.800")}>
            <Text color={useColorModeValue("gray.900", "white")}>
                ©Double-Digit 2022
            </Text>
        </Center>
    )
}

export default Footer