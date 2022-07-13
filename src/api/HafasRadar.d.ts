declare namespace Hafas_Radar {
  export interface Radar {
    direction: string;
    tripId: number;
    line: Line;
    location: Location;
    nextStopovers: StopOvers[];
    direction: string;
    frames: Frames[]
  }

  export interface Stopovers {
    stop: Stop[]
  }

  export interface Frames {
    origin: Origin;
    destination: Destination;
    t: number;
  }


  export interface Stop {
    type: string,
    id: string,
    name: string,
    location: Location,
    products: Products
  }


  export interface Location {
    type: string;
    latitude: number;
    longitude: number;
  }

  export interface Destination {
    type: string;
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

  export interface Line {
    type: string;
    id: string;
    fahrtNr: string;
    name: string;
    public: boolean;
    mode: string;
    product: string;
  }

  export interface Operator {
    type: string;
    id: string;
    name: string;
  }

}
