import { Box, Flex } from '@chakra-ui/react'
import "./tripStation.css"
import { useTripStationTimes } from './useTripViewTime'

function TripStation({ tripStation, variant }: { tripStation: Hafas_Trip.Stopover, variant?: "top" | "bottom" }) {

    const { arrivalDelayed, arrivalTime,  departureTime } = useTripStationTimes(tripStation.departure, tripStation.plannedDeparture, tripStation.arrival, tripStation.plannedArrival)
    return (
        <Flex align="center" pb="15px" justifyItems={"center"}>
            <Box textAlign={"center"} w="4rem" >
                <p color={arrivalDelayed ? "red" : "green"}>{arrivalTime}</p>
                <p>{departureTime}</p>
            </Box>
            <Box w="20px" className="stationIndicator" >

                {variant != "top" && <div className="stationLine stationLineTop"></div>}
                <div className="stationDot"></div>
                {variant != "bottom" && <div className="stationLine stationLineBottom"></div>}
            </Box>
            <Box pl="2" flex="1">
                {tripStation.stop.name}
            </Box>
        </Flex>
    )
}

export default TripStation