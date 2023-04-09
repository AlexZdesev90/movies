import { getPopularMoviesActionCreator, setTotalPagesActionCreator } from '../actions';

export const fetchMovies = (currentPage, filter) => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${filter}?page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getPopularMoviesActionCreator(data.results));
        dispatch(setTotalPagesActionCreator(data.total_pages));
      });
  };
};
