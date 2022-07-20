const URL =
  "https://europe-west1-transport-radar-93936.cloudfunctions.net/default";
const getTrip = async (tripId: string, lineName: string) => {
  try {
    const bodyObject = {
      tripID: tripId,
      lineName: lineName,
    };
    const result = await fetch(URL + "/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });
    console.log(bodyObject);
    if (result.ok) {
      const data: Hafas_Trip.Trip = await result.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getTrip };
