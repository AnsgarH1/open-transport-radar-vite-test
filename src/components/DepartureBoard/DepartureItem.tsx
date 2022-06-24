import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { FcCancel } from "react-icons/fc"
import { DateTime } from "luxon"
import { useEffect } from 'react'
import { useDepartureTime } from './useDepartureTime'

function DepartureItem({ departure, index }: { departure: Hafas_Departures.Departure, index: number }) {
    const { line, platform, destination, cancelled, when, plannedWhen, remarks, direction } = departure


    const { displayDepartureTime, delayed, delay } = useDepartureTime(when, plannedWhen)


    if (cancelled) return (
        <Flex direction="column" borderTop={index === 0 ? "none" : "lightgrey solid"}>
            <Flex justify="space-between">
                <Flex align="center">
                    <Icon as={FcCancel} mr="1" boxSize={"7"} />
                    <Heading size={"sm"} overflow="hidden" as="s" whiteSpace="nowrap">{line.name}</Heading>
                </Flex>
                <Text as="s" textOverflow={"ellipsis"} whiteSpace="nowrap">{destination.name}</Text>
            </Flex>
        </Flex>
    )

    return (
        <AccordionItem >
            <Flex direction="column" borderTop={index === 0 ? "none" : "lightgrey solid"}>
                <AccordionButton>
                    <Box w="100%">

                        <Flex justify={"space-between"} p="0" m="0" >

                            <Flex align="center">
                                {platform && <Box border="solid 1px" bgColor="blue.700" color="white" px="1" rounded="md" mr="1">{platform}</Box>}
                                <Heading size="sm">{line.name}</Heading>
                            </Flex>
                            <Flex align={"center"}>
                                {!!delay && <Text fontSize={"sm"} pr="2">{ }({delay} Min. verspätet)</Text>}
                                <Text >{displayDepartureTime}</Text>
                            </Flex>
                        </Flex>

                        <Text align="left" fontSize={"xl"}>{destination.name}</Text>

                    </Box>

                </AccordionButton>
                <AccordionPanel>
                    <Text>Betreiber: {line.operator.name}</Text>
                    <Text>Fahrt-Nr. {line.fahrtNr}</Text>
                    {remarks && remarks.map((remark, remarkIndex) => <Box py="2" borderTop={remarkIndex === 0 ? "none" : "lightgray solid"} fontSize="xs">{remark.text}</Box>)}
                </AccordionPanel>
            </Flex>
            <Flex justify="center">
                <AccordionIcon />
            </Flex>
        </AccordionItem>

    )
}

export default DepartureItem