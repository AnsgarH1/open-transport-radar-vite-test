import { DateTime } from "luxon"

const useTripStationTimes = (when: Date | null, plannedWhen: Date | null, arrival: Date | null, plannedArrival: Date | null) => {


    function get24HourFormatArrival(): string {
        if (plannedArrival) {
            const dt = DateTime.fromJSDate(new Date(plannedArrival))
            return `${dt.toLocaleString(DateTime.TIME_24_SIMPLE)}`
        } else {
            return "--:--"
        }
    }
    function get24HourFormatDeparture(): string {
        if (plannedWhen) {
            const dt = DateTime.fromJSDate(new Date(plannedWhen))
            return `${dt.toLocaleString(DateTime.TIME_24_SIMPLE)}`
        } else {
            return "--:--"
        }
    }

    return {
        arrivalDelayed: arrival !== plannedArrival,
        arrivalTime: get24HourFormatArrival(),
        departureDelayed: when !== plannedWhen,
        departureTime: get24HourFormatDeparture()

    }
}

export { useTripStationTimes }