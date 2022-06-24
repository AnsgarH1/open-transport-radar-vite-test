declare module Hafas_Stations{

  export interface Station {
    type:     string;
    id:       string;
    name:     string;
    location: Location;
    products: Products;
    distance: number;
  }
  
  export interface Location {
    type:      string;
    id:        string;
    latitude:  number;
    longitude: number;
  }
  
  export interface Products {
    expressTrain:      boolean;
    longDistanceTrain: boolean;
    regionaTrain:      boolean;
    sBahn:             boolean;
    uBahn:             boolean;
    tram:              boolean;
    bus:               boolean;
    watercraft:        boolean;
    ast:               boolean;
    cableCar:          boolean;
  }
  
}