import { Box, Button, Flex, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/react'
import DepartureStation from './DepartureStation'
import useStations from './useStations'

function DepartureBoard() {

    const { nearbyStations, isLoadingStations } = useStations()

    return (
        <Box>
            <Box bgColor="gray.300" p="0" m="0">
                {
                    isLoadingStations ? <Spinner /> :
                        nearbyStations.length > 0 ?
                            nearbyStations.map((station, index) => <DepartureStation key={station.id} index={index} station={station} />)
                            :
                            <Text>keine Haltestellen gefunden!</Text>
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