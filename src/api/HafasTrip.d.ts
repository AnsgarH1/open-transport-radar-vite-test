declare namespace Hafas_Trip {
    export interface Trip {
        origin: Destination;
        destination: Destination;
        departure: Date;
        plannedDeparture: Date;
        departureDelay: null;
        arrival: Date;
        plannedArrival: Date;
        arrivalDelay: number;
        reachable: boolean;
        line: Line;
        direction: string;
        currentLocation: Location;
        arrivalPlatform: null;
        plannedArrivalPlatform: null;
        departurePlatform: null;
        plannedDeparturePlatform: null;
        stopovers: Stopover[];
        remarks: TripRemark[];
        id: string;
        realtimeDataUpdatedAt: number;
    }

    export interface Location {
        type: CurrentLocationType;
        latitude: number;
        longitude: number;
        id?: string;
    }

    export enum CurrentLocationType {
        Location = "location",
    }

    export interface Destination {
        type: DestinationType;
        id: string;
        name: string;
        location: Location;
        products: Products;
    }

    export interface Products {
        expressTrain: boolean;
        longDistanceTrain: boolean;
        regionaTrain: boolean;
        sBahn: boolean;
        uBahn: boolean;
        tram: boolean;
        bus: boolean;
        watercraft: boolean;
        ast: boolean;
        cableCar: boolean;
    }

    export enum DestinationType {
        Stop = "stop",
    }

    export interface Line {
        type: string;
        id: string;
        fahrtNr: string;
        name: string;
        public: boolean;
        adminCode: string;
        productName: string;
        mode: string;
        product: string;
        operator: Operator;
    }

    export interface Operator {
        type: string;
        id: string;
        name: string;
    }

    export interface TripRemark {
        type: RemarkType;
        code: string;
        text: string;
    }

    export enum RemarkType {
        Hint = "hint",
        Status = "status",
        Warning = "warning",
    }

    export interface Stopover {
        stop: Destination;
        arrival: Date | null;
        plannedArrival: Date | null;
        arrivalDelay: number | null;
        arrivalPlatform: null | string;
        plannedArrivalPlatform: null | string;
        departure: Date | null;
        plannedDeparture: Date | null;
        departureDelay: number | null;
        departurePlatform: null | string;
        plannedDeparturePlatform: null | string;
        remarks?: StopoverRemark[];
    }

    export interface StopoverRemark {
        type: RemarkType;
        code?: Code;
        text: string;
        id?: string;
        summary?: string;
        icon?: Icon;
        priority?: number;
        products?: Products;
        company?: string;
        categories?: number[];
        validFrom?: Date;
        validUntil?: Date;
        modified?: Date;
    }

    export enum Code {
        TextOccupLOC2Nd11 = "text.occup.loc.2nd.11",
        TextOccupLOC2Nd12 = "text.occup.loc.2nd.12",
        TextOccupLOCMax11 = "text.occup.loc.max.11",
        TextOccupLOCMax12 = "text.occup.loc.max.12",
        TextRealtimeStopPlatformChange = "text.realtime.stop.platformChange",
    }

    export interface Icon {
        type: string;
        title: null;
    }
}
