
const URL =
  "https://europe-west1-transport-radar-93936.cloudfunctions.net/default";
const getStations = async ({
  long,
  lat,
  distance,
}: {
  long: number;
  lat: number;
  distance?: number;
}) => {
  try {
    const result = await fetch(URL + "/stations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude: lat, longitude: long }),
    });
    if (result.ok) {
      const data: Hafas_Stations.Station[] = await result.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getStations };
