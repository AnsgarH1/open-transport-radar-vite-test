import { ToastId, useToast } from "@chakra-ui/react"
import React, { ReactNode, useContext, useEffect, useRef, useState } from "react"

interface LocationContextProps {
    isLoadingLocation: boolean,
    locationError: GeolocationPositionError | undefined,
    currentLocation: GeolocationPosition | undefined,
    browserSupported: boolean | undefined,
}

const initialLocatioContext: LocationContextProps = {
    isLoadingLocation: false,
    locationError: undefined,
    currentLocation: undefined,
    browserSupported: undefined
}

export const LocationContext = React.createContext<LocationContextProps>(initialLocatioContext)
export const useLocationContext = () => useContext(LocationContext)

export function LocationContextProvider({ children }: { children: ReactNode }) {

    const toast = useToast()
    const locationToastId = useRef<ToastId>()

    const showLocationLoadingToast = () => {
        locationToastId.current = toast({ status: "loading", title: "Lade Standort..", duration: null, isClosable: true })
    }
    const updateLocationFoundToast = () => {
        if (locationToastId.current) {
            toast.update(locationToastId.current, ({ title: "neuen Standort gefunden!", status: "success", duration: 2000 }))
        }
    }
    const [position, setPosition] = useState<GeolocationPosition>()
    const [positionError, setPositionError] = useState<GeolocationPositionError>()
    const [isLoading, setLoading] = useState(false)

    const [hasInitialized, setInitialized] = useState(false)


    useEffect(() => {

        if ("geolocation" in navigator) {
            setLoading(true)
            if (!hasInitialized) showLocationLoadingToast()

            navigator.geolocation.watchPosition(position => {

                setLoading(false)
                setPosition(position)
                if (!hasInitialized) updateLocationFoundToast()

            }, error => {
                setPositionError(error)
                setInitialized(true)
                setLoading(false)
            })

        }
         setInitialized(true)

    }, [])

    return (
        <LocationContext.Provider value={{
            currentLocation: position,
            locationError: positionError,
            browserSupported: "geolocation" in Navigator,
            isLoadingLocation: isLoading
        }}
        >
            {children}
        </LocationContext.Provider>)
}