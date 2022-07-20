import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Spinner } from '@chakra-ui/react';
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


const useMap = () => {
    console.log("useMap")
    const [map, setMap] = useState<mapboxgl.Map>();
    const [isLoadingMap, setLoadingMap] = useState(false)
    const { currentLocation, locationError, browserSupported, isLoadingLocation } = useContext(LocationContext)
    const { radar, isLoadingRadar, loadRadar } = useRadar();
    //const { tick } = useInterval(placeVehiclesOnMap, 2000);
    const { set, reset, clear} = useTimeout(initMap, 2000);
    const [touched, setTouched] = useState(false)
    const [isRunning, setIsRunning] = useState(true);
    const [lng, setLng] = useState(13.404955)
    const [lat, setLat] = useState(52.520007)
    const [updateSource, setUpdateSource] = useState(0);
    const [zoom, setZoom] = useState(16);
    const mapContainer = useRef(null);


    useEffect(() => {
        console.log("isLoadingLocation;", isLoadingLocation)
        const m = initMap() //initialize map
        // if(!m){
        //     console.log("IS UNDEFINDED")
        //     reset();
        // } else {
        //     console.log("IS DEFINED")
        // }
        //return cleanup();
        addUserLayer();

    }), [isLoadingLocation, currentLocation];

    useEffect(() => {
        if(!map) return;
        setMapPosition()
    }), [isLoadingMap];

    //adds vehicles on map
    useEffect(() => {
        updateRadar();
        const updateSource = setInterval(async () => {
            placeVehiclesOnMap()
        }, 2000);

        return (() => {
            console.log("radar cleared", lng, lat)
            if (updateSource) { clearInterval(updateSource); }
        })
    }), [lng, lat];

    const setMapPosition = () => {
        if (!map) return; //waiting for map to be initialized

        if (!currentLocation) {
            console.log(`useMap.useEffect: ${locationError?.message}  ${currentLocation}`);
            return;
        }
        //addUserLocationLayer()
        //setLoadingMap(false)

        //set lng and lat to current user location
        // console.log("setze lng und lat");

        setLng(currentLocation.coords.longitude);
        setLat(currentLocation.coords.latitude);

        if (!touched) {
            map.easeTo({ center: [lng, lat] })        
        }
        addUserLayer();
    }

    const updateRadar = () => {
        console.log("isLoadingRadar:", isLoadingRadar, lng, lat)
        addUserLayer();

        // tick();
        // const updateSource = setInterval(async () => {
        //     placeVehiclesOnMap()
        // }, 2000);
        // setUpdateSource(updateSource);

        // return (() => {
        //     console.log("radar cleared", lng, lat)
        //     if (updateSource) { clearInterval(updateSource); }
        // })
        // if (isLoadingRadar) return;

        //loadRadar(lng, lat)
    }

    function initMap () {
        if (map) return; //init map only one
        setLoadingMap(true)

        if(isLoadingLocation){
            console.log("returned bc location was loading")
            return}; //waiting on location to be loaded

        const node = mapContainer.current;
        //ref is not set till after the function returns and the content is rendered
        
        if (typeof window === "undefined" || node === null) {
            // setLoadingMap(false)
            return;
        }

        // if (!currentLocation) {
        //     console.log(`#### useMap.initMap: Error: ${locationError?.message}, CL:  ${currentLocation}, Loading:${isLoadingLocation} ####`)
        //     // setLoadingMap(false)
        //     return
        // }
        // setLng(currentLocation.coords.longitude);
        // setLat(currentLocation.coords.latitude);

        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: 'pk.eyJ1IjoidGltb3RoeWlzYWFjIiwiYSI6ImNsNHNiOGNkajAxMnAzam16aDJ4Mnh3ZnAifQ.TjhXY87DUEZ9w_fqVXOfDw', //process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
        console.log("new Map")

        // mapboxMap.on('move', () => {
        //     // setTouched(true);
        //     // setLng(mapboxMap.getCenter().lng)
        //     // setLat(mapboxMap.getCenter().lat)
        //     // setZoom(mapboxMap.getZoom())
        // })

        const nav = new mapboxgl.NavigationControl()
        // const ctrl = new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //         enableHighAccuracy: true
        //     },
        //     trackUserLocation: true,
        //     showUserHeading: true
        // })

       //mapboxMap.addControl(ctrl)
        mapboxMap.addControl(nav)
        // ctrl.trigger();
        // mapboxMap.on('load', () => {
        //     // ctrl.trigger();
        //     setLoadingMap(false)
        // });

        setMap(mapboxMap);
        setLoadingMap(false)

        return mapboxMap;
    }

    // /**
    //  * 
    //  * @param vehicle 
    //  * @returns GeoJSON with coordinates from a vehicle
    //  */
    // function getGeoJSONFromVehicle(vehicle: Hafas_Radar.Radar): FeatureCollection<Geometry, GeoJsonProperties> | undefined {
    //     if (!vehicle) {
    //         console.log("useMap.getLocation: No Vehicle (Radar) found")
    //         return;
    //     }
    //     const ln = vehicle.location.longitude
    //     const la = vehicle.location.latitude
    //     const title = vehicle.tripId.toString()

    //     return convertToGeoJSON(ln, la, title)
    // }

    function placeVehiclesOnMap() {
        console.log("radar:", radar)
        if (radar && !isLoadingRadar) {
            loadRadar(lat, lng)
            addVehicleLayer(radar)
        }
    }

    function addVehicleLayer(radar: Hafas_Radar.Radar[]) {

        if (!radar || !map) return;

        //iterate through all found vehicles 
        radar.forEach((e) => {
            const ln = e.location.longitude
            const lt = e.location.latitude
            const title = e.tripId.toString()
            addObjectOnMap(ln, lt, title, "red")     
        })
    }

    function addUserLayer() {
        if (!map || !map.isStyleLoaded()) return;
        const title = "user"
        addObjectOnMap(lng, lat, title, "blue");
    }

    function addObjectOnMap(ln:number, lt:number, title:string, color:string){
        if(!map) return;
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
            map.on('click', title, (v) => {

                //if user got click keep user in focus
                title == "user" ? setTouched(false): setTouched(true);

                if (!v || !v.features) return;
                map.flyTo({
                    center: [v.lngLat.lng, v.lngLat.lat]
                });

            });
            map.on('mouseenter', title, () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', title, () => {
                map.getCanvas().style.cursor = '';
            });
        }
    }

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

    const cleanup = () => {
        if (map) map.remove()
    }

    return {
        isLoadingMap,
        initMap,
        placeVehiclesOnMap,
        map,
        mapContainer,
    }
}

export default useMap

