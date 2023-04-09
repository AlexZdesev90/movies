import { combineReducers, createStore, applyMiddleware } from 'redux';
import movieReducer from './reducers/movieReducer';
import actorReducer from './reducers/actorReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  movies: movieReducer,
  actors: actorReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
