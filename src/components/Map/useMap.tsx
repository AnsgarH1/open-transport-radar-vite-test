import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Spinner } from '@chakra-ui/react';
import { LocationContext } from '../../context/LocationContext';
import { FaCaretRight } from 'react-icons/fa';
import { GeoJSON, Geometry, GeoJsonProperties, FeatureCollection } from 'geojson';
import useRadar from './useRadar';


interface MapboxMapProps {
    onCreated?(map: mapboxgl.Map): void;
    onLoaded?(map: mapboxgl.Map): void;
    onRemoved?(): void;
}

const useMap = (
) => {
    const [map, setMap] = useState<mapboxgl.Map>();
    const [isLoadingMap, setLoadingMap] = useState(false)
    const { currentLocation, locationError, browserSupported, isLoadingLocation } = useContext(LocationContext)
    const { radar, isLoadingRadar, loadRadar } = useRadar();
    const [lng, setLng] = useState(13.404954)
    const [lat, setLat] = useState(52.520007)
    const [zoom, setZoom] = useState(18);
    const mapContainer = useRef(null);

    const initMap = () => {
        const node = mapContainer.current;
        //ref is not set till after the function returns and the content is rendered
        if (typeof window === "undefined" || node === null) {
            setLoadingMap(false)
            return;
        }
        setLoadingMap(true)

        if (isLoadingLocation || !currentLocation) {
            console.log(`#### useMap.initMap: ${locationError?.message}  ${currentLocation}, am Laden:${isLoadingLocation} ####`)
            setLoadingMap(false)
            return
        }
        setLng(currentLocation.coords.longitude);
        setLat(currentLocation.coords.latitude);

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
        setLoadingMap(false)

        return mapboxMap;
    }

    useEffect(() => {
        setLoadingMap(true)
        if (map || isLoadingLocation) return; //init map nur 1x || warte bis location geladen ist
        loadRadar(lat, lng);
        initMap();
    }), [isLoadingLocation];

    useEffect(() => {

        if (!map) return; //warte auf init der map
        setLoadingMap(false)
        if (isLoadingMap || !currentLocation) {
            console.log(`useMap.useEffect: ${locationError?.message}  ${currentLocation}`);
            return;
        }
        setLng(currentLocation.coords.longitude);
        setLat(currentLocation.coords.latitude);
        map.jumpTo({ center: [lng, lat] })

        const updateSource = setInterval(async () => {
            setVehiclesOnMap()
        }, 2500);

        return (() => {
            if (updateSource) {
                clearInterval(updateSource);
            }
        })

    }), [];


    function getLocation(vehicle: Hafas_Radar.Radar): FeatureCollection<Geometry, GeoJsonProperties> | undefined {
        if (!vehicle) {
            console.log("useMap.getLocation: No Vehicle (Radar) found")
            return;
        }
        return {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [vehicle.location.longitude, vehicle.location.latitude]
                    },
                    "properties": {
                        "title": vehicle.tripId.toString(),
                    }
                }
            ]
        };
    }

    function setVehiclesOnMap() {
        // if(!radar) {
        //     loadRadar(lat,lng);
        //     console.log("###radar geladen mit:", lat, lng, "###")
        if (radar && !isLoadingRadar) {
            addVehicles(radar)
            loadRadar(lat, lng)
        }
    }



    function addVehicles(radar: Hafas_Radar.Radar[]) {

        if (!radar || !map) return;
        radar.forEach((e) => {

            const tripId = e.tripId.toString()
            const geojson = getLocation(e)
            if (map.getSource(tripId)) { //wenn source schon vorhanden, update position                    
                const source = map.getSource(tripId) as mapboxgl.GeoJSONSource
                if (geojson) {
                    source.setData(geojson)
                }
            } else {
                map.addSource(tripId, {
                    type: 'geojson',
                    data: geojson
                });
                map.addLayer({
                    'id': tripId,
                    'type': 'symbol',
                    'source': tripId,
                    'layout': {
                        'icon-image': 'car-15'
                    }
                });
            }
        })

    };

    return {
        isLoadingMap,
        initMap,
        getLocation,
        setVehiclesOnMap,
        map,
        mapContainer,
    }
}

export default useMap