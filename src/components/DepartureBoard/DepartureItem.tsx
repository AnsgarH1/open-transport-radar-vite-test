import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Heading, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FcCancel } from "react-icons/fc"

import { useDepartureTime } from './departureHooks/useDepartureTime'
import { InfoIcon } from '@chakra-ui/icons'
import useTrip from './departureHooks/useTrip'
import TripView from '../TripView/TripView'

function DepartureItem({ departure, index }: { departure: Hafas_Departures.Departure, index: number }) {

    const { line, platform, destination, cancelled, when, plannedWhen, remarks, direction, tripId } = departure
    const { displayDepartureTime, delay } = useDepartureTime(when, plannedWhen)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { trip, isLoading, loadTrip } = useTrip(tripId, line.name || line.fahrtNr)

    const standard = useColorModeValue("light", "dark")
    const sign = useColorModeValue("brand.dark", "brand.sec")

    if (cancelled) return (
        <Flex rounded="lg" borderWidth="1px" borderColor={useColorModeValue("red.200", "red.700")} m="2" p="2" direction="column" borderTop={index === 0 ? "none" : "lightgrey solid 0.1px "} >
            <Box>
                <Flex align="center" justify="space-between">
                    <Box>

                        <Icon as={FcCancel} mr="1" boxSize={"7"} />
                        <Heading size={"sm"} overflow="hidden" as="s" whiteSpace="nowrap">{line.name}</Heading>
                    </Box>
                    <Text color={useColorModeValue("red.600", "red.500")}>Fällt aus!</Text>
                </Flex>
                <Text as="s" fontSize={"xl"} overflow="hidden" textOverflow={"ellipsis"} whiteSpace="nowrap">{destination.name}</Text>
            </Box>
        </Flex>
    )

    return (
        <AccordionItem rounded="lg" borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.700")} m="2">
            <Flex direction="column" >
                <AccordionButton>
                    <Box w="100%" >

                        <Flex justify={"space-between"} p="0" m="0" >

                            <Flex align="center">
                                {platform && <Box border="solid 1px" bgColor={sign} color={standard} px="1" rounded="md" mr="1" whiteSpace={"nowrap"}>{platform}</Box>}
                                <Heading size="sm">{line.name || "LineName"}</Heading>
                            </Flex>
                            <Flex align={"center"} justifyContent="end"  >
                                {!!delay && <Text fontSize={"sm"} pr="2">{ }({delay} Min. verspätet)</Text>}
                                <Text >{displayDepartureTime}</Text>
                            </Flex>
                        </Flex>
                        <Text align="left" fontSize={"xl"}>{destination?.name || direction || "RMV-Datenfehler: Ziel nicht angegeben"}</Text>

                    </Box>

                </AccordionButton>
                <AccordionPanel>

                    <Text>Betreiber: {line.operator?.name || "keine Info vorhanden"}</Text>
                    <Text onClick={onOpen} mt="2" ><InfoIcon mr="2" />Es liegen aktuelle Meldungen vor</Text>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Aktuelle Meldungen</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box py="2" fontSize="sm" borderTop="lightgray solid" > <Text>Fahrt-Nr. {line.fahrtNr}</Text></Box>
                                {remarks && remarks.map((remark, remarkIndex) => <Box key={remarkIndex} py="2" borderTop={"lightgray solid"} fontSize="sm" dangerouslySetInnerHTML={{ __html: remark.text }}></Box>)}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    {trip ? <TripView trip={trip} /> :
                        <Button w="full" size="xs" mt="4" onClick={loadTrip} isLoading={isLoading}>Lade gesamte Fahrt</Button>}

                </AccordionPanel>
            </Flex>
            <Flex justify="center">
                <AccordionIcon />
            </Flex>
        </AccordionItem >

    )
}

export default DepartureItem