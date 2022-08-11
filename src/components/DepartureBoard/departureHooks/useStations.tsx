import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getStations } from '../../../api/stations'
import { useLocationContext } from '../../../context/LocationContext'

const useStations = () => {

    const toast = useToast()





    const [isLoadingStations, setLoadingStations] = useState(false)
    const [nearbyStations, setNearbyStations] = useState<Hafas_Stations.Station[]>([])
    const { currentLocation, locationError } = useLocationContext()
    const [errorDisplayText, setErrorDisplayText] = useState("⏲ initialisiere..")


    function loadStations(lat: number, long: number) {
        setErrorDisplayText("🚏 lade Haltestellen..")
        setLoadingStations(true)
        getStations({ lat, long })
            .then(stations => {
                toast({ status: "success", title: "neue Haltestellen gefunden!", duration: 1000 })
                if (stations && stations?.length > 0) {
                    setErrorDisplayText("hier sollte eigentlich keine Fehlermeldung stehen👻")
                    setNearbyStations(stations)
                } else {
                    setErrorDisplayText("Es konnten keine Haltestellen geladen werden!🕳")

                }
            }).catch((e) => {
                console.log(e)
                toast({ status: "error", title: "Haltestellen konnten nicht geladen werden!", duration: 2000 })
                setErrorDisplayText("❌ Es ist Fehler aufgetreten")
            }).finally(() => setLoadingStations(false))
    }

    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        console.log("currentLocation Effekt!")
        if (currentLocation && !initialized) {
            loadStations(currentLocation.coords.latitude, currentLocation.coords.longitude)
            setInitialized(true)
        }
    }, [currentLocation,])

    useEffect(() => {
        console.log("LocationError effekt!")
        if (locationError) {
            setErrorDisplayText(`❌ Der Standort konnte nicht geladen werden! ${locationError.message}`)
        }
    }, [locationError])
    return {
        nearbyStations: nearbyStations || undefined,
        loadStations,
        isLoadingStations,
        errorDisplayText

    }
}

export default useStations