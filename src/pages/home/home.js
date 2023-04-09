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
  SET_CURRENT_PAGE,
  CHANGE_SEARCH_VALUE,
  CHANGE_FILTERED_VALUE,
  SET_FILTER,
  GET_POPULAR_MOVIES,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/asyncActions/fetchMovies';

const Home = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const filter = useSelector((state) => state.movies.filter);
  const filteredValue = useSelector((state) => state.movies.filteredValue);

  useEffect(() => {
    dispatch(fetchMovies(currentPage, filter));
  }, [filter, currentPage]);

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch({ type: CHANGE_SEARCH_VALUE, payload: value });
    }, 500),
    [],
  );

  const onChangeSearchValue = (value) => {
    if(value.length === 0) {
      window.location.href = '/';
    }
    dispatch({ type: CHANGE_FILTERED_VALUE, payload: value });
    updateSearchValue(value);
  };

  const onClickChanged = (value) => {
    dispatch({ type: SET_FILTER, payload: value });
    dispatch({ type: CHANGE_SEARCH_VALUE, payload: '' });
    dispatch({ type: CHANGE_FILTERED_VALUE, payload: '' });
  };

  return (
    <>
      <div className={classes.poster}>
        <div className={classes.sliderContainer}>
          <Carousel
            showThumbs={false}
            autoPlay={true}
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
        </div>
        <div className={classes.handliers}>
          <SearchBar searchValue={filteredValue} onChangeSearchValue={onChangeSearchValue} />
          <DropDown filter={filter} onClickChanged={onClickChanged} />
        </div>
        <MovieList
        />
        <Grid container justifyContent="center" sx={{ p: '1.8rem' }}>
          <div className={classes.paginationWrapper}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, num) => dispatch({ type: SET_CURRENT_PAGE, payload: num })}
              variant="outlined"
              color="secondary"
            />
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Home;
