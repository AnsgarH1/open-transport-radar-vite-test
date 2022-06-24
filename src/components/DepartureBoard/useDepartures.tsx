import { useEffect, useState } from "react";
import { getDepartures } from "../../api/departures";

const useDepartures = (stationId: string) => {
  const [isLoading, setLoading] = useState(false);
  const [departures, setDepartures] = useState<Hafas_Departures.Departure[]>(
    []
  );
  
  useEffect(() => {
    setLoading(true);
    getDepartures(stationId)
      .then((departures) => {
        if (departures) {
          setDepartures(departures);

        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    departures: departures || undefined,
    isLoading,
  };
};

export default useDepartures;
