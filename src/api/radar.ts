
const URL =
    "https://europe-west1-transport-radar-93936.cloudfunctions.net/default";
const getRadar = async ({
    north,
    west,
    south,
    east
}: {
    north: number;
    west: number;
    south: number;
    east: number;
}) => {
    try {
        const result = await fetch(URL + "/radar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ north, west, south, east }),
        });
        if (result.ok) {
            const data: Hafas_Radar.Radar[] = await result.json();
            
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export { getRadar };
