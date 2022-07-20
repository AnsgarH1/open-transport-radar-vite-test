import { useBoolean, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { getDepartures } from "../../../api/departures";

const useDepartures = (stationId: string) => {

  const toast = useToast()

  const [isLoading, setLoading] = useState(false);
  const [departures, setDepartures] = useState<Hafas_Departures.Departure[]>(
    []
  );
  const [showAll, setShowAll] = useState(false)
  const showAllButtonRef = useRef<HTMLButtonElement>(null)

  const toggleShowAll = () => {
    setShowAll(curr => !curr)
  }
  useEffect(() => {
    if (!showAll) {
      showAllButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    } else {
      window.scrollBy({ top: 500, behavior: "smooth" })
    }

  }, [showAll])



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
    departures: (showAll ? departures : departures.slice(0, 5)) || undefined,
    showAll,
    toggleShowAll,
    showAllButtonRef,
    showMoreAvailable: departures.length > 5,
    isLoading,
    loadDepartures,
  };
}

export default useDepartures;
