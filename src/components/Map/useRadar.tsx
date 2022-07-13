import { useContext, useEffect, useState } from "react";
import { getRadar } from "../../api/radar";
import { LocationContext } from "../../context/LocationContext";

const useRadar = () => {

  const [isLoadingRadar, setLoadingRadar] = useState(false);
  const [radar, setRadar] = useState<Hafas_Radar.Radar[]>([]);
  const [radius, setRadius] = useState(0.02)
  const [north, setNorth] = useState(0)
  const [west, setWest] = useState(0)
  const [south, setSouth] = useState(0)
  const [east, setEast] = useState(0)
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
          console.log(radar);
        }
      }).catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoadingRadar(false);
      });

      // useEffect(() => {
      //   // setNorth(currentLocation.coords.latitude + radius)
      //   // setWest(currentLocation.coords.longitude - radius)
      //   // setSouth(currentLocation.coords.latitude - radius)
      //   // setEast(currentLocation.coords.longitude + radius) 
      // },[])

  }

 

  // useEffect(() => {
  //   const a = async () => {
  //   if (currentLocation) {
  //           setNorth(currentLocation.coords.latitude + radius)
  //           setWest(currentLocation.coords.longitude - radius)
  //           setSouth(currentLocation.coords.latitude - radius)
  //           setEast(currentLocation.coords.longitude + radius)       
  //           await loadRadar()
  //         console.log("useRadar.useEffect: Radar boundaries gesetzt")
  //     } else {
  //       console.log("useRadar.useEffect: Geolocation not found")
  //     }   
  //   } 
  //   a(); 
  // }, []);

  return {
    radar: radar || undefined,
    isLoadingRadar,
    loadRadar,
    setRadius
  };
};

export default useRadar;
