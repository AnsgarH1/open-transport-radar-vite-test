import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useDepartureTime } from '../../commonHooks/useDepartureTime'
import "./tripStation.css"
import { useTripStationTimes } from './useTripViewTime'

function TripStation({ tripStation, variant }: { tripStation: Hafas_Trip.Stopover, variant?: "top" | "bottom" }) {

    const { arrivalDelayed, arrivalTime, departureDelayed, departureTime } = useTripStationTimes(tripStation.departure, tripStation.plannedDeparture, tripStation.arrival, tripStation.plannedArrival)
    return (
        <Flex align="center" pb="15px">
            <Box pr="2" textAlign={"center"} >
                <p color={arrivalDelayed ? "red" : "green"}>{arrivalTime}</p>
                <p>{departureTime}</p>
            </Box>
            <div className="stationIndicator">

                {variant != "top" && <div className="stationLine stationLineTop"></div>}
                <div className="stationDot"></div>
                {variant != "bottom" && <div className="stationLine stationLineBottom"></div>}
            </div>
            <Box pl="2">
                {tripStation.stop.name}
            </Box>
        </Flex>
    )
}

export default TripStation