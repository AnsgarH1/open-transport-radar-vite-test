import "mapbox-gl/dist/mapbox-gl.css";
import useMap from './useMap';
import { Skeleton } from "@chakra-ui/react";


function Map() {

    const { isLoadingMap, mapContainer } = useMap();

    return (
        isLoadingMap
            ? <Skeleton style={{ width: "100%", height: "100%" }} />
            : (<div data-testid={"map"} ref={mapContainer} style={{ width: "100%", height: "100%" }} />)
    )
}

export default Map