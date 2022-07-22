import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Spinner, useColorMode } from '@chakra-ui/react';
import { LocationContext } from '../../context/LocationContext';
import { FaCaretRight } from 'react-icons/fa';
import { GeoJSON, Geometry, GeoJsonProperties, FeatureCollection } from 'geojson';
import useRadar from './useRadar';
import useInterval from './useInterval';
import useTimeout from './useTimeout';


interface MapboxMapProps {
    onCreated?(map: mapboxgl.Map): void;
    onLoaded?(map: mapboxgl.Map): void;
    onRemoved?(): void;
}

/**
 * THIS FUNCTION NEEDS SOME WORK, VERY FRAGILE BEHAVIOUR
 * SO MANY RE-RENDERS, BECAUSE OF RADAR
 * @returns 
 */
const useMap = () => {
    const [map, setMap] = useState<mapboxgl.Map>();
    const [isLoadingMap, setLoadingMap] = useState(false)
    const { currentLocation, locationError, browserSupported, isLoadingLocation } = useContext(LocationContext)
    const { radar, isLoadingRadar, loadRadar } = useRadar();
    // const { set, reset, clear} = useTimeout(initMap, 2000);
    const [touched, setTouched] = useState(false)
    const [zoom, setZoom] = useState(16);
    const mapContainer = useRef(null);
    const [mapStyle, setMapStyle] = useState() 
    const { colorMode } = useColorMode();


    useEffect(() => {
        if (map) return; //init map only once
        initMap() //initialize map
    }), [isLoadingLocation];

    //sets position of the map if there is a map
    useEffect(() => {
        if (!map) return; //only enters when map is initialized
        setMapPosition()
        // changeMapStyle();
    }), [isLoadingMap];

    //adds vehicles on map
    useEffect(() => {
        const updateSource = setInterval(async () => {
            loadVehicles()
            addUserOnMap();
        }, 2000);
        return (() => {
            if (updateSource) { clearInterval(updateSource); }
        })
    }), [];


    /**
     * 
     * @returns 
     */
    const setMapPosition = () => {
        if (!map) return; //waiting for map to be initialized

        if (!currentLocation) { //if no current location is found return
            console.log(`useMap.setMapPosition: ${locationError?.message}  ${currentLocation}`);
            return;
        }
        //if map is touch don't center anymore
        if (!touched) {
            map.easeTo({ center: [currentLocation.coords.longitude, currentLocation.coords.latitude] })
        }
        addUserOnMap();
    }



    function initMap() {
        setLoadingMap(true)

        if (isLoadingLocation) {
            return
        }; //waiting on location to be loaded

        //ref is not set till after the function returns and the content is rendered
        const node = mapContainer.current;

        if (typeof window === "undefined" || node === null) {
            setLoadingMap(false)
            return;
        }

        if (!currentLocation) {
            console.log(`useMap.initMap: Error: ${locationError?.message}, CL:  ${currentLocation}, Loading:${isLoadingLocation} ####`)
            setLoadingMap(false)
            return
        }

        //color of map depends on colorMode
        const layer = colorMode === "light" ? "streets-v11" : "dark-v10"
        
        //init new mapbox map
        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: 'pk.eyJ1IjoidGltb3RoeWlzYWFjIiwiYSI6ImNsNHNiOGNkajAxMnAzam16aDJ4Mnh3ZnAifQ.TjhXY87DUEZ9w_fqVXOfDw', //process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/mapbox/" + layer,
            center: [currentLocation.coords.longitude, currentLocation.coords.latitude],
            zoom: zoom,
        });

        


        const nav = new mapboxgl.NavigationControl()

        mapboxMap.addControl(nav)

        setMap(mapboxMap);
        setLoadingMap(false)

        return mapboxMap;
    }

    /**
     * 
     */
    function loadVehicles() {
        if (radar && !isLoadingRadar && currentLocation) {
            loadRadar(currentLocation.coords.latitude, currentLocation.coords.longitude)
            addVehicleOnMap(radar)
        }
    }

    /**
     * places Vehicles on Map
     * @param radar 
     * 
     * @returns 
     */
    function addVehicleOnMap(radar: Hafas_Radar.Radar[]) {
        if (!radar || !map) return;
        //iterate through all found vehicles 
        radar.forEach((e) => {
            const ln = e.location.longitude
            const lt = e.location.latitude
            const title = e.tripId.toString()
            addObjectOnMap(ln, lt, title, "red")
        })
    }

    /**
     * Adds a layer for the user 
     * @returns 
     */
    function addUserOnMap() {
        if (!map || !map.isStyleLoaded() || !currentLocation) return;
        const title = "user"
        addObjectOnMap(currentLocation.coords.longitude, currentLocation.coords.latitude, title, "blue");
    }

    /**
     * Adds source and visible layer on map
     * maybe change color to img in future
     * @param ln longitude
     * @param lt latitude
     * @param title name of object
     * @param color color of object
     * @returns 
     */
    function addObjectOnMap(ln: number, lt: number, title: string, color: string) {
        if (!map) return;
        const geojson = convertToGeoJSON(ln, lt, title)
        if (map.getSource(title)) { //if user was already added just update the position                    
            const source = map.getSource(title) as mapboxgl.GeoJSONSource
            if (geojson) { source.setData(geojson) }
            return;
        } else {
            map.addSource(title, {
                type: 'geojson',
                data: geojson
            });
            map.addLayer({
                'id': title,
                'type': 'circle',
                'source': title,
                'paint': {
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-color': color,
                    'circle-stroke-color': 'white'
                }
            });

            /*
             * here comes what happen when you click on a object
             * for test purpose, it centers on object right now
             * different & useful logic should be added
             */
            map.on('click', title, (v) => {

                //if user got click keep user in focus
                title == "user" ? setTouched(false) : setTouched(true);

                if (!v || !v.features) return;
                map.flyTo({
                    center: [v.lngLat.lng, v.lngLat.lat]
                });

            });

            // change to pointer when hover over object
            map.on('mouseenter', title, () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            // change it back to a pointer when it leaves.
            map.on('mouseleave', title, () => {
                map.getCanvas().style.cursor = '';
            });
        }
    }

    /**
     * Takes coordinates and name and returns GeoJSON
     * @param lng 
     * @param lat 
     * @param title 
     * @returns geojson: FeatureCollection<Geometry, GeoJsonProperties> | undefined 
     */
    function convertToGeoJSON(lng: number, lat: number, title: string): FeatureCollection<Geometry, GeoJsonProperties> | undefined {
        return {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [lng, lat]
                    },
                    "properties": {
                        "title": title,
                    }
                }
            ]
        }
    }

    const changeMapStyle = () => {
        const layer = colorMode === "light" ? "streets-v11" : "dark-v10"
        if(map) map.setStyle('mapbox://styles/mapbox/' + layer);
    }


    const cleanup = () => {
        if (map) map.remove()
    }

    return {
        isLoadingMap,
        initMap,
        map,
        mapContainer,
        changeMapStyle
    }
}

export default useMap

