import React, { ReactNode, useContext, useEffect, useState } from "react"

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

    const [position, setPosition] = useState<GeolocationPosition>()
    const [positionError, setPositionError] = useState<GeolocationPositionError>()
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        let positionWatchID: number;
        if ("geolocation" in navigator) {
            setLoading(true)
            positionWatchID = navigator.geolocation.watchPosition(position => {
                setPosition(position)
                setLoading(false)
            }, error => {
                setPositionError(error)
                setLoading(false)
            })

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