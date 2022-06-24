import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { FcCancel } from "react-icons/fc"
import { DateTime } from "luxon"
import { useEffect } from 'react'
import { useDepartureTime } from './useDepartureTime'

function DepartureItem({ departure }: { departure: Hafas_Departures.Departure }) {
    const { line, platform, destination, cancelled, when, plannedWhen } = departure


    const { displayDepartureTime, hasDelayInfo, delayed } = useDepartureTime(when, plannedWhen)


    if (cancelled) return (
        <Flex direction="column">
            <Flex justify="space-between">
                <Flex>
                    <Icon as={FcCancel} mr="1" boxSize={"7"} />
                    <Heading size={"sm"} overflow="hidden" as="s" whiteSpace="nowrap">{line.name}</Heading>
                </Flex>
                <Text as="s" textOverflow={"ellipsis"} whiteSpace="nowrap">{destination.name}</Text>
            </Flex>
        </Flex>
    )

    return (
        <Flex direction="column" p="1">
            <Flex justify={"space-between"}>

                <Flex align="center">
                    {platform && <Box border="solid 1px" bgColor="blue.700" color="white" px="1" rounded="md" mr="1">{platform}</Box>}
                    <Heading size="sm">{line.name}</Heading>
                </Flex>
                <Flex>
                    <Text color={delayed ? "red.600":"black"}>{displayDepartureTime}</Text>
                </Flex>
            </Flex>

            <Text>{destination.name}</Text>
        </Flex>

    )
}

export default DepartureItem