import reducer from "./reducer";
import * as StationsActions from "../actions/stations";
import { Station } from "../models/station";

export type StationsState = Station[];

const initialState:StationsState = [];

export const stationsReducer = reducer<StationsState>(initialState, ((on) => {
    on(StationsActions.fetchSuccess, (_state, action) => {
        return action.payload.stations;
    })
}))