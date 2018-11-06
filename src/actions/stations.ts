import { createAction } from "redux-actions";
import { Station } from "../models/station";

export const fetch = createAction('FETCH_STATIONS');

export interface FetchStationsSuccessPayload {
    stations: Station[]
}
export const fetchSuccess = createAction<FetchStationsSuccessPayload>('FETCH_STATIONS_SUCCESS');

export interface FetchStationsErrorPayload {
    error: string;
}
export const fetchError = createAction<FetchStationsErrorPayload>('FETCH_STATIONS_ERROR');
