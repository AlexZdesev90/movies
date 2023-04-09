import {
  GET_POPULAR_ACTORS,
  SET_TOTAL_PAGES_ACTOR,
  SET_CURRENT_PAGE_ACTOR,
  CHANGE_SEARCH_VALUE_ACTOR,
  CHANGE_FILTERED_VALUE_ACTOR,
  CHANGE_LOADING_ACTORS,
} from '../actions';

const defaultState = {
  actors: [],
  currentPageActors: 1,
  totalPagesActors: 500,
  searchValueActors: '',
  filteredValueActors: '',
  isLoading: true,
};

const actorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_POPULAR_ACTORS:
      return { ...state, actors: [...action.payload] };
    case SET_CURRENT_PAGE_ACTOR:
      return { ...state, currentPageActors: action.payload };
    case SET_TOTAL_PAGES_ACTOR:
      return { ...state, totalPagesActors: action.payload };
    case CHANGE_SEARCH_VALUE_ACTOR:
      return { ...state, searchValueActors: action.payload };
    case CHANGE_FILTERED_VALUE_ACTOR:
      return { ...state, filteredValueActors: action.payload };
    case CHANGE_LOADING_ACTORS:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default actorReducer;
