import { SagaIterator } from "redux-saga";
import { takeLatest, put, call } from 'redux-saga/effects';
import * as StationsActions from "../actions/stations";
import { Station } from "../models/station";
import { getAllStations } from "../api/bysykkel";

function* fetchStations(): SagaIterator {
    try {
        const result = yield call(getAllStations);
        yield put(StationsActions.fetchSuccess({stations: result.stations}));
      } catch (error) {
        yield put(StationsActions.fetchError(error));
      }
}

export function* stationsSaga() {
    yield takeLatest(StationsActions.fetch, fetchStations);
}