import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
    const [map, setMap] = useState<mapboxgl.Map>();
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    const mapNode = useRef(null);

    useEffect(() => {
        const node = mapNode.current;

        if (typeof window === "undefined" || node === null) return;

        const mapboxMap = new mapboxgl.Map({
            container: node,
                    accessToken: 'pk.eyJ1IjoidGltb3RoeWlzYWFjIiwiYSI6ImNsNHNiOGNkajAxMnAzam16aDJ4Mnh3ZnAifQ.TjhXY87DUEZ9w_fqVXOfDw', //process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
                    style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });

        setMap(mapboxMap);
        return () => {
            mapboxMap.remove();
        };
        }, []);
    
    return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
  }
  
  export default Map