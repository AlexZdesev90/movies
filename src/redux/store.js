import { combineReducers, createStore } from 'redux';
import movieReducer from '../redux/reducers/movieReducer';
// import actorsReducer from './actorsReducer';

const rootReducer = combineReducers({
    movies: movieReducer,
    // actors: actorsReducer,
})

export const store = createStore(rootReducer);