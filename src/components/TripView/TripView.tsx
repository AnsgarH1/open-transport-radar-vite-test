import TripStation from './TripStation'

function TripView({ trip }: { trip: Hafas_Trip.Trip }) {
    return (
        <div>
            <TripStation tripStation={trip.stopovers[0]} variant="top" />
            {trip.stopovers.slice(1, -1).map(stopOver => <TripStation key={stopOver.stop.id + "randomKey"} tripStation={stopOver} />)}
            <TripStation tripStation={trip.stopovers[trip.stopovers.length - 1]} variant="bottom" />
        </div>
    )
}

export default TripView