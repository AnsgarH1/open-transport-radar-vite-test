import * as functions from "firebase-functions";
import express = require("express");
import * as cors from "cors";
import {body, query, validationResult} from "express-validator";
import createClient = require("hafas-client");
import rmvProfile = require("hafas-client/p/rmv");

const app = express();

app.use(cors({origin: true}));

const stationsRequestValidation = [
    body("latitude").isFloat(),
    body("longitude").isFloat(),
    body("distance").optional().isInt(),
];

app.post(
    "/stations",
    stationsRequestValidation,
    async (req: express.Request, res: express.Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            functions.logger.info(req.body);
            const {latitude, longitude, distance = 400} = req.body;

            const client = createClient(rmvProfile, "transport-radar");

            const results = await client.nearby(
                {type: "location", latitude, longitude},
                {distance},
            );
            functions.logger.info("Hafas Results:", results);
            return res.json(results);
        } catch (e) {
            functions.logger.error(e);
            return res.status(500).json(e);
        }
    },
);

const departureRequestValidation = [query("stationID").isNumeric()];
app.get(
    "/departures",
    departureRequestValidation,
    async (req: express.Request, res: express.Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            functions.logger.info(req.query);
            const {stationID} = req.query;
            if (typeof stationID != "string") {
                return res.status(400);
            }
            const client = createClient(rmvProfile, "transport-radar");

            const results = await client.departures(stationID, undefined);
            functions.logger.info("Hafas Results:", results);
            return res.json(results);
        } catch (e) {
            functions.logger.error(e);
            return res.status(500).json(e);
        }
    },
);

const radarRequestValidation = [
    body("north").isFloat(),
    body("west").isFloat(),
    body("south").isFloat(),
    body("east").isFloat(),
    body("duration").isInt().optional(),
    body("frames").isInt().optional(),
    body("results").isInt().optional(),
];

app.get(
    "/radar",
    radarRequestValidation,
    async (req: express.Request, res: express.Response) => {
        functions.logger.debug("radar invoked!");
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                functions.logger.error("invalid request body");
                return res.status(400).json(errors.array());
            }
            functions.logger.info(req.body);
            const {
                north,
                west,
                south,
                east,
                duration = 10,
                frames = 6,
                results = 10,
            } = req.body;

            const client = createClient(rmvProfile, "transport-radar");
            if (client.radar) {
                const radar_results = await client.radar(
                    {north, west, south, east},
                    {duration, frames, results},
                );
                functions.logger.info("Hafas Results:", radar_results);
                return res.json(radar_results);
            } else {
                throw Error("Unexpected Error! no Radar available!");
            }
        } catch (e) {
            functions.logger.error(e);
            return res.status(500).json(e);
        }
    },
);

export default functions.region("europe-west1").https.onRequest(app);
