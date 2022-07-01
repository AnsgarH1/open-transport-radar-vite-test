const URL =
  "https://europe-west1-transport-radar-93936.cloudfunctions.net/default";
const getTrip = async ({
  tripId,
  lineName,
}: {
  tripId: string;
  lineName: string;
}) => {
  try {
    const result = await fetch(URL + "/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId, lineName }),
    });
    if (result.ok) {
      const data: Hafas_Trip.Trip = await result.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getTrip };
