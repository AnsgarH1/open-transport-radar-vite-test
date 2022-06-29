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
       
        if (!currentLocation?.coords) { console.log("Map.useEffect: No coordinates found"); return }
        const lat = currentLocation.coords.latitude;
        const lng = currentLocation.coords.longitude;

        if (map) {
            map.flyTo({ center: [lng, lat] })
        }
        else {
            initMap()
        }
    }, [currentLocation, isLoadingLocation]);

    return (
        isLoadingLocation && isLoadingMap
            ? <Spinner size='xl' alignSelf={"center"} />
            : (<div ref={mapNode} style={{ width: "100%", height: "100%" }} />)
    )
}

export default Map