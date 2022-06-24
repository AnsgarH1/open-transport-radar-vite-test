import { createStandaloneToast, ToastId, useToast, UseToastOptions } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { getStations } from '../../api/stations'

const useStations = () => {

    const toast = useToast()
    const locationToastId = useRef<ToastId>()
    const stationsToastId = useRef<ToastId>()

    const showLocationToast = () => {
        locationToastId.current = toast({ status: "info", description: "Lade Standort..", duration: null, isClosable: true })
    }

    const updateLocationToast = (options: UseToastOptions) => {
        if (locationToastId.current) {
            toast.update(locationToastId.current, options)
        }
    }

    const showStationsToast = () => {
        stationsToastId.current = toast({ status: "info", description: "Lade Haltestellen..", duration: null, isClosable: true })
    }
    const updateStationToast = (options: UseToastOptions) => {
        if (stationsToastId.current) {
            toast.update(stationsToastId.current, options)
        }
    }



    const [isLoadingGeoLocation, setLoadingGeoLocation] = useState(false)
    const [isLoadingStations, setLoadingStations] = useState(false)
    const [currentCoords, setCoords] = useState<GeolocationCoordinates>()
    const [nearbyStations, setNearbyStations] = useState<Hafas_Stations.Station[]>([])


    function loadStations(lat: number, long: number) {
        showStationsToast()
        setLoadingStations(true)
        getStations({ lat, long })
            .then(stations => {
                updateStationToast({ status: "success", description: "Haltestellen gefunden!", duration: 2000 })
                if (stations) setNearbyStations(stations)
            }).finally(() => setLoadingStations(false))
    }

    /** Fetching Browser Location **/
    useEffect(() => {
        if ("geolocation" in navigator) {
            setLoadingGeoLocation(true)
            showLocationToast()
            navigator.geolocation.getCurrentPosition(position => {
                updateLocationToast({ status: "success", description: "Standort gefunden!", duration: 2000 })
                console.log("found position,", position.coords)
                setCoords(position.coords)
                /** Get Nearby Stations with found coordinates */
                loadStations(position.coords.latitude, position.coords.longitude)
            }, (error) => {
                updateLocationToast({ status: "error", title: "Standort-Feler", description: error.message, duration: 5000 })

            })
        }
    }, [])

    return {
        nearbyStations: nearbyStations || undefined,
        loadStations,
        currentCoords,
        isLoadingStations

    }
}

export default useStations