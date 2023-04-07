import { combineReducers, createStore } from 'redux';
import movieReducer from './reducers/movieReducer';
import actorReducer from './reducers/actorReducer';

const rootReducer = combineReducers({
    movies: movieReducer,
    actors: actorReducer,
})

export const store = createStore(rootReducer);