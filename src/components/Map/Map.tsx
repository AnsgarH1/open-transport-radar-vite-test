import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Spinner } from '@chakra-ui/react';
import { LocationContext } from '../../context/LocationContext';
import { FaCaretRight } from 'react-icons/fa';
import useMap from './useMap';



function Map() {
    const { isLoadingMap, initMap, map, mapNode } = useMap();

    const { currentLocation,
        locationError,
        browserSupported,
        isLoadingLocation } = useContext(LocationContext)

    useEffect(() => {
        console.log("Map.tsx: useEffect")

        if (!currentLocation) {
            console.log(`EY ICH HAB noch keinen Standort aber loading: ${isLoadingLocation}`)
        } else {
            console.log(`Ich habe einen Standort aber loading: ${isLoadingLocation}`)
        }
        if (!currentLocation?.coords) { console.log("No coordinates found "); return }
        const lat = currentLocation.coords.latitude;
        const lng = currentLocation.coords.longitude;
        console.log("Neue Koordinatn gesendet")

        if (map) {
            map.flyTo({ center: [lng, lat] })
            console.log(`Ich fliege!! (zu lat: ${lat} & lng: ${lng}`)
        }
        else {
            initMap()
            console.log(`Ich fliege NICHT (zu lat: ${lat} & lng: ${lng} + map:${map}`)
        }
    }, [currentLocation, isLoadingLocation]);

    return (
        isLoadingLocation && isLoadingMap
            ? <Spinner size='xl' alignSelf={"center"} />
            : (<div ref={mapNode} style={{ width: "100%", height: "100%" }} />)
    )
}

export default Map