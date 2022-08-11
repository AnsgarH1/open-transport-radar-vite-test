import { Box, Skeleton, Text } from '@chakra-ui/react'
import DepartureStation from './DepartureStation'
import useStations from './departureHooks/useStations'

function DepartureBoard() {

    const { nearbyStations, isLoadingStations, errorDisplayText } = useStations()

    return (
        <Box>
            <Box minH="24rem" p="0" m="0" >
                {
                    isLoadingStations ? <Skeleton m="1" h="4rem" rounded={6} /> :
                        nearbyStations.length > 0 ?
                            nearbyStations.map((station, index) => <DepartureStation key={station.id} index={index} station={station} />)
                            :

                            <Text pt="4rem" align={"center"} noOfLines={2} color="light">{errorDisplayText}</Text>
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