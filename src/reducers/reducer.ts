import { Reducer, Action, handleActions } from 'redux-actions';

interface ActionCreator<Payload> {
  (payload: Payload): Action<Payload>;
}

interface ActionReducer<State, Payload> {
  (state: State, action: Action<Payload>): State;
}

interface ActionReducers<State> {
  [key: string]: ActionReducer<State, any>;
}

interface RegisterReducer<State> {
  <Payload>(
    actionCreator: ActionCreator<Payload>,
    reducer: ActionReducer<State, Payload>): void;
}

interface ActionHandlerCallback<State> {
  (registerReducer: RegisterReducer<State>): void;
}

export default function reducer<State>(
  initialState: State,
  cb: ActionHandlerCallback<State>): Reducer<State, State> {
  const actionReducers: ActionReducers<State> = {};

  cb(
    <Payload>(
      actionCreator: ActionCreator<Payload>,
      reducer: ActionReducer<State, Payload>) => {
      const sampleAction = actionCreator({} as any);
      if (actionReducers[sampleAction.type]) {
        throw new Error(`reducing same action type twice: ${sampleAction.type}`);
      }

      actionReducers[sampleAction.type] = reducer;
    });

  return handleActions<State, State>(actionReducers, initialState);
}
