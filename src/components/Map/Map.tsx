import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Skeleton, Spinner, Button } from '@chakra-ui/react';
import { LocationContext } from '../../context/LocationContext';
import { FaCaretRight } from 'react-icons/fa';
import useMap from './useMap';
import useRadar from './useRadar';
import { getRadar } from '../../api/radar';


function Map() {

    const { isLoadingMap, mapContainer } = useMap();

    return (
        isLoadingMap
            ? <Skeleton style={{ width: "100%", height: "100%" }} />
            : (<div data-testid={"map"} ref={mapContainer} style={{ width: "100%", height: "100%" }} />)
    )
}

export default Map