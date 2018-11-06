import { spawn } from 'redux-saga/effects';
import { stationsSaga } from './stations';
import { SagaIterator } from 'redux-saga';

export function* rootSaga(): SagaIterator {
    yield spawn(stationsSaga);
}