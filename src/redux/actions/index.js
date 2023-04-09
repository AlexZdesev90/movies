export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE';
export const CHANGE_FILTERED_VALUE = 'CHANGE_FILTERED_VALUE';
export const SET_FILTER = 'SET_FILTER';

export const GET_POPULAR_ACTORS = "GET_POPULAR_ACTORS";
export const SET_TOTAL_PAGES_ACTOR = "SET_TOTAL_PAGES_ACTOR";
export const SET_CURRENT_PAGE_ACTOR = "SET_CURRENT_PAGE_ACTOR";
export const CHANGE_SEARCH_VALUE_ACTOR = "CHANGE_SEARCH_VALUE_ACTOR";
export const CHANGE_FILTERED_VALUE_ACTOR = "CHANGE_FILTERED_VALUE_ACTOR";
export const CHANGE_LOADING_ACTORS = "CHANGE_LOADING_ACTORS";

export const getPopularMoviesActionCreator = movies => ({type: GET_POPULAR_MOVIES, payload: movies});
export const setCurrentPageActionCreator = pageNumber => ({type: SET_CURRENT_PAGE, payload: pageNumber});
export const changeSearchValueActionCreator = searchValue => ({type: CHANGE_SEARCH_VALUE, payload: searchValue});
export const setTotalPagesActionCreator = totalPages => ({type: SET_TOTAL_PAGES, payload: totalPages});
export const changeFiltredValueActionCreator = filtredValue => ({type: CHANGE_FILTERED_VALUE, payload: filtredValue});
export const setFilterActionCreator = value => ({type: SET_FILTER, payload: value});

export const getActorsActionCreator = actors => ({type: GET_POPULAR_ACTORS, payload: actors});
export const setCurrentPageActorsCreator = pageNumber => ({type: SET_CURRENT_PAGE_ACTOR, payload: pageNumber});
export const changeSearchValueActorsCreator = searchValue => ({type: CHANGE_SEARCH_VALUE_ACTOR, payload: searchValue});
export const setTotalPagesActorActionCreator = totalPages => ({type: SET_TOTAL_PAGES_ACTOR, payload: totalPages});
export const changeFiltredValueActorsActionCreator = filtredValue => ({type: CHANGE_FILTERED_VALUE_ACTOR, payload: filtredValue});
