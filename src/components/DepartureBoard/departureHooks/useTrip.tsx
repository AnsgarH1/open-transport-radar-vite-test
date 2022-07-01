import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getTrip } from "../../../api/trip"


const useTrip = (tripId: string, lineName: string) => {
    const toast = useToast()
    const [trip, setTrip] = useState<Hafas_Trip.Trip>()
    const [isLoadingTrip, setIsLoadingTrip] = useState(false)


    useEffect(() => {
        loadTrip()
    })

    const loadTrip = () => {
        setIsLoadingTrip(true)
        getTrip({ tripId, lineName }).then(trip => {
            setTrip(trip)
        }).catch(error => {
            toast({ status: "error", description: "Trip konnte nicht geladen werden!" })
            console.error(error)
            console.log(error)
        })
    }

    return {
        trip,
        isLoading: isLoadingTrip,
        loadTrip
    }
}

export default useTrip