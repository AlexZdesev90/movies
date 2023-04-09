import { GET_POPULAR_MOVIES, SET_TOTAL_PAGES } from '../actions';

export const fetchMovies = (currentPage, filter) => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${filter}?page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_POPULAR_MOVIES, payload: data.results });
        dispatch({ type: SET_TOTAL_PAGES, payload: data.total_pages });
      });
  };
};
