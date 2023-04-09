import React, { useCallback, useEffect } from 'react';
import classes from './movieList.module.css';
import Card from '../card/card';
import { getPopularMoviesActionCreator, setTotalPagesActionCreator } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const MovieList = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);
  const searchValue = useSelector((state) => state.movies.searchValue);
  const currentPage = useSelector((state) => state.movies.currentPage);

  useEffect(() => {
    dispatch(getPopularMoviesActionCreator(movies));
  }, []);

  const queryString = (searchValue) => (searchValue !== '' ? `?query=${searchValue}&` : '?');

  useEffect(() => {
    getData(searchValue);
  }, [searchValue, `${searchValue !== '' ? currentPage : ''}`]);

  const getData = useCallback(
    (searchValue) => {
      fetch(
        `https://api.themoviedb.org/3/search/movie${queryString(
          searchValue,
        )}page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(getPopularMoviesActionCreator(data.results));
          dispatch(setTotalPagesActionCreator(data.total_pages));
        });
    },
    [`${searchValue.length > 0 ? currentPage : ''}`],
  );

  return (
    <div className={classes.movie__list}>
      <h2 className={classes.list__title}>MOVIES</h2>
      <div className={classes.list__cards}>
        {movies?.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
