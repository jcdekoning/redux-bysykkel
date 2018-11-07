import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './index.css';
import App, {AppProps} from './App';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga);

const render = (AppComponent: React.StatelessComponent<AppProps>) => {
    ReactDOM.render(
        <AppContainer>
            <AppComponent store={store} />
        </AppContainer>, 
        document.getElementById('root'));
}

render(App);

if (module.hot){
    module.hot.accept('./App', () => render(require('./App').default));
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default
        store.replaceReducer(nextRootReducer)
      });
}