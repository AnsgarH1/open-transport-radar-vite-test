import { Box, Flex, Heading, List, ListItem } from '@chakra-ui/react'
import DepartureStation from './DepartureStation'
import useStations from './useStations'

function DepartureBoard() {

    const { nearbyStations } = useStations()

    return (
        <Box>
            <Box bgColor="gray.300" p="0" m="0">
                {nearbyStations.map(station => <DepartureStation station={station} />)}
            </Box>

        </Box>
    )
}

export default DepartureBoard



/**
 * 
 * 50.071118, 8.243114
 */