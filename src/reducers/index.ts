import { combineReducers } from 'redux';
import { StationsState, stationsReducer } from './stations';

export interface AppState {
    stations: StationsState
}

export const rootReducer = combineReducers<AppState>({
    stations: stationsReducer
});