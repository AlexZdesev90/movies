import React, { useCallback, useEffect, useState } from 'react';
import classes from './movieList.module.css';
// import { useParams } from "react-router-dom"
import Cards from '../card/card';

const MovieList = ({ searchValue, currentPage, setNewTotalPages, popularMovies }) => {
  const [movieList, setMovieList] = useState();

  useEffect(() => {
    setMovieList(popularMovies);
  }, [popularMovies]);

  const queryString = (searchValue) => (searchValue !== '' ? `?query=${searchValue}&` : '?');

  useEffect(() => {
    getData(searchValue);
  }, [searchValue, `${searchValue !== '' ? currentPage : ''}`]);

  const getData = useCallback((searchValue) => {
    console.log('movielist')
    fetch(
      `https://api.themoviedb.org/3/search/movie${queryString(
        searchValue,
      )}page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setNewTotalPages(data.total_pages);
      });
  }, [`${searchValue !== '' ? currentPage : ''}`])

  return (
    <div className={classes.movie__list}>
      <h2 className={classes.list__title}>MOVIES</h2>
      <div className={classes.list__cards}>
        {movieList?.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
