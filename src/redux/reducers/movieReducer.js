import {
  GET_POPULAR_MOVIES,
  SET_TOTAL_PAGES,
  SET_CURRENT_PAGE,
  CHANGE_SEARCH_VALUE,
  CHANGE_FILTERED_VALUE,
  SET_FILTER,
} from '../actions';

const defaultState = {
  movies: [],
  currentPage: 1,
  totalPages: 37772,
  searchValue: '',
  filteredValue: '',
  filter: 'popular',
};

const movieReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      return { ...state, movies: [...action.payload] };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    case CHANGE_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case CHANGE_FILTERED_VALUE:
      return { ...state, filteredValue: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default movieReducer;
