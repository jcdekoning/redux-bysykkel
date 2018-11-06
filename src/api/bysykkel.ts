import { Station } from "../models/station";
import { getApi } from "./common";

export const getAllStations = (): Promise<Station[]> => 
    getApi('/api/v1/stations');