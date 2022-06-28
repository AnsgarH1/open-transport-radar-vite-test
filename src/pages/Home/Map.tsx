import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import useCoords from '../../components/DepartureBoard/useCoords';
import { Spinner } from '@chakra-ui/react';
import { LocationContext } from '../../context/LocationContext';

function Map() {
    const [map, setMap] = useState<mapboxgl.Map>();
    const [isLoadingMap, setLoadingMap] = useState(false)

    const [zoom, setZoom] = useState(17);
    const { currentLocation,
        locationError,
        browserSupported,
        isLoadingLocation} = useContext(LocationContext)
    const mapNode = useRef(null);


    useEffect(() => {
        const node = mapNode.current;

        if (typeof window === "undefined" || node === null) return;
        if(!currentLocation?.coords){console.log("No coordinates found "); return }

        const lat = currentLocation.coords.latitude;
        const long = currentLocation.coords.longitude;
        console.log(`Latitude: " + ${lat}, Longitude: " + ${long}`)

        const mapboxMap = new mapboxgl.Map({
            container: node,
                accessToken: 'pk.eyJ1IjoidGltb3RoeWlzYWFjIiwiYSI6ImNsNHNiOGNkajAxMnAzam16aDJ4Mnh3ZnAifQ.TjhXY87DUEZ9w_fqVXOfDw', //process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
                style: "mapbox://styles/mapbox/streets-v11",
            center: [long, lat],
            zoom: zoom,
        });

        setMap(mapboxMap);
        return () => {
            mapboxMap.remove();
        };
    }, [isLoadingLocation]);

    return (
        isLoadingLocation
        ?  <Spinner size='xl'/>
        : (<div ref={mapNode} style={{ width: "100%", height: "100%" }} />))
}
  
export default Map