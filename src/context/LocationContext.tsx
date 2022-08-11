import { ToastId, ToastOptions, useToast, UseToastOptions } from "@chakra-ui/react"
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
    const updateLocationFoundToast = (options: UseToastOptions) => {
        if (locationToastId.current) {
            toast.update(locationToastId.current, ({ ...options }))
        }
    }
    const [position, setPosition] = useState<GeolocationPosition>()
    const [positionError, setPositionError] = useState<GeolocationPositionError>()
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {

        if ("geolocation" in navigator) {
            setLoading(true)

            if (locationToastId.current) {
                if (!toast.isActive(locationToastId.current)) {
                    showLocationLoadingToast()
                }
            } else {
                showLocationLoadingToast()

            }

            navigator.geolocation.watchPosition(position => {

                setLoading(false)
                setPosition(position)

                if (locationToastId.current && !toast.isActive(locationToastId.current)) {
                    updateLocationFoundToast({ status: "success", title: "Standort gefunden!", isClosable: true, duration:1000 })
                } else {
                    toast({ status: "success", title: "Standort gefunden!", isClosable:true, duration:1000 })
                }

            }, error => {
                console.log(error)
                setPositionError(error)
                setLoading(false)


                if (locationToastId.current && !toast.isActive(locationToastId.current)) {
                    updateLocationFoundToast({ status: "error", title: "Standort-Fehler!", description: error.message, duration: 5000, isClosable: true })
                } else {
                    toast({ status: "error", title: "Standort-Fehler!", description: error.message, duration: 5000, isClosable: true })
                }
            })

        } else {
            toast({ status: "error", title: "Standort-Fehler", description: "Standort konnte nicht geladen werden! Bitte aktiviere den Standort in den Browser-Einstellungen" })
        }

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