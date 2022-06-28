import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Spinner } from '@chakra-ui/react';
import { LocationContext } from '../../context/LocationContext';
import { FaCaretRight } from 'react-icons/fa';

interface MapboxMapProps {
    onCreated?(map: mapboxgl.Map): void;
    onLoaded?(map: mapboxgl.Map): void;
    onRemoved?(): void;
}

const useMap = (
) => {
    const [map, setMap] = useState<mapboxgl.Map>();
    const [isLoadingMap, setLoadingMap] = useState(false)
    //const {currentLocation, isLoadingLocation} = useContext(LocationContext)
    const [lng, setLng] = useState(13)
    const [lat, setLat] = useState(52)
    const [zoom, setZoom] = useState(18);
    const mapNode = useRef(null);

    const initMap = () => {
        console.log("init map...")
        const node = mapNode.current;
        console.log(`check window ${typeof window} und ${node}`)
        if (typeof window === "undefined" || node === null) return;

        setLoadingMap(true)
        console.log('Uuuund:')
        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: 'pk.eyJ1IjoidGltb3RoeWlzYWFjIiwiYSI6ImNsNHNiOGNkajAxMnAzam16aDJ4Mnh3ZnAifQ.TjhXY87DUEZ9w_fqVXOfDw', //process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
        // mapboxMap.on('move', () => {
        //     setLng(mapboxMap.getCenter().lng)
        //     setLat(mapboxMap.getCenter().lat)
        //     setZoom(mapboxMap.getZoom())
        // })
        console.log(`Map neu gerendert (mit lat: ${lat} & lng: ${lng}`)

        const nav = new mapboxgl.NavigationControl()
        const ctrl = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        })
        mapboxMap.addControl(ctrl)
        mapboxMap.addControl(nav)

        setMap(mapboxMap)
        console.log("Map gesetzt")

        setLoadingMap(false)

        return () => { 
            console.log("Map removed")
            mapboxMap.remove() }
        ;
    }

    useEffect(() => {
        initMap();
    }, []);

    return {
        isLoadingMap,
        initMap,
        map,
        mapNode
    }
}

export default useMap