const URL =
  "https://europe-west1-transport-radar-93936.cloudfunctions.net/default";

const getDepartures = async (stationId: string) => {
  try {
    const result = await fetch(URL + "/departures" + `?stationID=${stationId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const data: Hafas_Departures.Departure[] = await result.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getDepartures };
