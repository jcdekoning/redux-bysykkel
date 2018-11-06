import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { AppState } from './reducers';
import Stations from './containers/Stations';

export interface AppProps {
  store: Store<AppState>;
}

const App: React.StatelessComponent<AppProps> = ({store} : AppProps) => {
  return (
      <Provider store={store}>
        <Stations />
      </Provider>
    );
}

export default App;
