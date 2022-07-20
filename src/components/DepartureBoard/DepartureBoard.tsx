import { Box, Button, Flex, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/react'
import DepartureStation from './DepartureStation'
import useStations from './useStations'

function DepartureBoard() {

    const { nearbyStations, isLoadingStations } = useStations()

    return (
        <Box pt="1" m="0">
            <Box >
                {
                    isLoadingStations ? <Spinner color="white"/> :
                        nearbyStations.length > 0 ?
                            nearbyStations.map((station, index) => <DepartureStation index={index} station={station} />)
                            :
                            <Text fontSize='lg' color="white" fontWeight='bold' textAlign="center">keine Haltestellen gefunden!</Text>
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