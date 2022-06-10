declare namespace Hafas_Departures {
  export interface Departure {
    tripID: string;
    stop: Destination;
    when: Date;
    plannedWhen: Date;
    delay: number;
    platform: null;
    plannedPlatform: null;
    direction: string;
    provenance: null;
    line: Line;
    remarks: Remark[];
    origin: null;
    destination: Destination;
  }

  export interface Destination {
    type: string;
    id: string;
    name: string;
    location: Location;
    products: Products;
  }

  export interface Location {
    type: string;
    id: string;
    latitude: number;
    longitude: number;
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

  export interface Remark {
    id?: string;
    type: string;
    summary?: string;
    text: string;
    icon?: Icon;
    priority?: number;
    products?: Products;
    company?: string;
    categories?: number[];
    validFrom?: Date;
    validUntil?: Date;
    modified?: Date;
    code?: string;
  }

  export interface Icon {
    type: string;
    title: null;
  }
}
