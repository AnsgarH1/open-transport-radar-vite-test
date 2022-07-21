import { useContext, useEffect, useState } from "react";
import { getRadar } from "../../api/radar";
import { LocationContext } from "../../context/LocationContext";

const useRadar = () => {

  const [isLoadingRadar, setLoadingRadar] = useState(false);
  const [radar, setRadar] = useState<Hafas_Radar.Radar[]>([]);
  const [radius, setRadius] = useState(0.02) // radius? oder maybe bounding box from map?
  const [north, setNorth] = useState(0)
  const [west, setWest] = useState(0)
  const [south, setSouth] = useState(0)
  const [east, setEast] = useState(0)
  // //maybe better use location context than use lat and lng arguments
  //const { currentLocation, locationError, browserSupported, isLoadingLocation } = useContext(LocationContext)

  function loadRadar(lat:number,lng:number) {
    setLoadingRadar(true);

    setNorth(lat + radius)
    setWest(lng - radius)
    setSouth(lat - radius)
    setEast(lng + radius)  
    
    getRadar({north, west, south, east})
      .then((radar) => {
        if (radar) {
          setRadar(radar);
          console.log("useRadar: radar gesetzt");
        }
      }).catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoadingRadar(false);
      });
  }

 
  // useEffect(() => {
  //   console.log("useRadar.useEffect")
  //   if(!currentLocation) return;
  //     setNorth(currentLocation.coords.latitude + radius)
  //     setWest(currentLocation.coords.longitude - radius)
  //     setSouth(currentLocation.coords.latitude - radius)
  //     setEast(currentLocation.coords.longitude + radius)
  //     loadRadar();
  // },[isLoadingLocation])


  return {
    radar: radar || undefined,
    isLoadingRadar,
    loadRadar,
    setRadius
  };
};

export default useRadar;
