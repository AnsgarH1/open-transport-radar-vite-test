import { Box, Button, Flex, Heading, List, ListItem, Skeleton, Spinner, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import DepartureStation from './DepartureStation'
import useStations from './departureHooks/useStations'

function DepartureBoard() {

    const { nearbyStations, isLoadingStations,errorDisplayText } = useStations()

    return (
        <Box>
            <Box minH="24rem" p="0" m="0" >
                {
                    isLoadingStations ? <Skeleton m="1" h="4rem" rounded={6} /> :
                        nearbyStations.length > 0 ?
                            nearbyStations.map((station, index) => <DepartureStation key={station.id} index={index} station={station} />)
                            :

                            <Text pt="4rem" align={"center"} color={useColorModeValue("primary", "secondary")}>{errorDisplayText}</Text>
                }
            </Box>


        </Box>
    )
}

export default DepartureBoard



/**
 * 
 * 50.071118, 8.243114
 */