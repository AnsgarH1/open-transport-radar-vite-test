import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDepartures } from "../../api/departures";

const useDepartures = (stationId: string) => {

  const toast = useToast()

  const [isLoading, setLoading] = useState(false);
  const [departures, setDepartures] = useState<Hafas_Departures.Departure[]>(
    []
  );

  function loadDepartures() {
    setLoading(true);
    getDepartures(stationId)
      .then((departures) => {
        if (departures) {
          setDepartures(departures);
        }
      }).catch(error => {
        toast({ status: "error", description: "Abfahrten konnten nicht geladen werden!" })
        console.error(error)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadDepartures()
  }, []);

  return {
    departures: departures || undefined,
    isLoading,
    loadDepartures
  };
};

export default useDepartures;
