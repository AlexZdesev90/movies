import React, { useCallback, useEffect } from 'react';
import classes from './home.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../../components/movieList/movieList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import debounce from 'lodash.debounce';
import { Pagination, Grid } from '@mui/material';
import { DropDown } from '../../components/dropDownMenu/DropDown';
import {
  GET_POPULAR_MOVIES,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  CHANGE_SEARCH_VALUE,
  CHANGE_FILTERED_VALUE,
  SET_FILTER,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);
  const searchValue = useSelector((state) => state.movies.searchValue);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const filter = useSelector((state) => state.movies.filter);
  const filteredValue = useSelector((state) => state.movies.filteredValue);

  useEffect(() => {
    console.log("home")
    fetch(
      `https://api.themoviedb.org/3/movie/${filter}?page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_POPULAR_MOVIES, payload: data.results });
        dispatch({ type: SET_TOTAL_PAGES, payload: data.total_pages });
      });
  }, [filter, `${searchValue === '' ? currentPage : ''}`]);

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch({ type: CHANGE_SEARCH_VALUE, payload: value });
      dispatch({ type: CHANGE_FILTERED_VALUE, payload: value });
    }, 500),
    [],
  );

  const onChangeSearchValue = (value) => {
    dispatch({ type: CHANGE_SEARCH_VALUE, payload: value });
    updateSearchValue(value);
  };

  const setNewTotalPages = (num) => {
    dispatch({ type: SET_TOTAL_PAGES, payload: num });
  };

  const onClickChanged = (value) => {
    dispatch({ type: SET_FILTER, payload: value });
    dispatch({ type: CHANGE_SEARCH_VALUE, payload: '' });
    dispatch({ type: SET_FILTER, payload: '' });
  };

  return (
    <>
      <div className={classes.poster}>
        <Carousel
          showThumbs={false}
          autoPlay
          transitionTime={1}
          infiniteLoop={true}
          showStatus={false}
          showArrows={true}
          showIndicators={true}
        >
          {movies?.map((movie) => (
            <Link
              key={movie.id}
              style={{ textDecoration: 'none', color: 'white' }}
              to={`/movie/${movie.id}`}
            >
              <div className={classes.posterImage}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                  alt="img"
                />
              </div>
              <div className={classes.posterImage__overlay}>
                <div className={classes.posterImage__title}>
                  {movie ? movie.original_title : ''}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <div className={classes.handliers}>
          <SearchBar searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
          <DropDown filter={filter} onClickChanged={onClickChanged} />
        </div>
        <MovieList
          searchValue={filteredValue}
          currentPage={currentPage}
          setNewTotalPages={(num) => setNewTotalPages(num)}
          popularMovies={movies}
        />
        <Grid container justifyContent="center" sx={{ p: '2rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, num) => dispatch({ type: SET_CURRENT_PAGE, payload: num })}
            variant="outlined"
            color="secondary"
          />
        </Grid>
      </div>
    </>
  );
};

export default Home;
