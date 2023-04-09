import { GET_POPULAR_ACTORS, SET_TOTAL_PAGES_ACTOR } from '../actions';

export const fetchActors = (currentPage) => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/person/popular?page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_POPULAR_ACTORS, payload: data.results });
        dispatch({ type: SET_TOTAL_PAGES_ACTOR, payload: data.total_pages });
      });
  };
};
