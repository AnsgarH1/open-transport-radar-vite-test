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
        getGeoLocation();
    }, [])

    const getGeoLocation = async () => {
        let positionWatchID: number;
        if ("geolocation" in navigator) {
            setLoading(true)
            positionWatchID = await watchPosition()
            console.log(`LocationContext.useEffect: positionWatchID=${positionWatchID}`)
        }
    }



    const watchPosition = async () => {
        var options = {
            enableHighAccuracy: true,
            timeout:    7000,   // time in millis when error callback will be invoked
            maximumAge: 0,      // max cached age of gps data, also in millis
          };
        
          return new Promise<number>(function(resolve, reject) {
            navigator.geolocation.watchPosition(position => {
                setPosition(position)
                console.log("context: found position,", position.coords)

                setLoading(false)
            }, error => {
                setPositionError(error)
                setLoading(false)
            }, options);
          });
    }

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