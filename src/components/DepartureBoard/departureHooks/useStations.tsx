import { createStandaloneToast, ToastId, useToast, UseToastOptions } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { getStations } from '../../../api/stations'
import { useLocationContext } from '../../../context/LocationContext'

const useStations = () => {

    const toast = useToast()





    const [isLoadingStations, setLoadingStations] = useState(false)
    const [nearbyStations, setNearbyStations] = useState<Hafas_Stations.Station[]>([])
    const { currentLocation } = useLocationContext()
    const [errorDisplayText, setErrorDisplayText] = useState("⏲warte auf Standort..")


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
            }).catch(error => {
                toast({ status: "error", title: "Haltestellen konnten nicht geladen werden!", duration: 2000 })
                setErrorDisplayText("❌Es ist Fehler aufgetreten")
            }).finally(() => setLoadingStations(false))
    }



    useEffect(() => {
        if (currentLocation) {
            loadStations(currentLocation.coords.latitude, currentLocation.coords.longitude)
        }
    }, [currentLocation])

    return {
        nearbyStations: nearbyStations || undefined,
        loadStations,
        isLoadingStations,
        errorDisplayText

    }
}

export default useStations