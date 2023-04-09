import React, { useCallback, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import classes from './person.module.css';
import PersonList from '../../components/personList.js/personList';
import debounce from 'lodash.debounce';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Pagination, Grid } from '@mui/material';
import {
  changeFiltredValueActorsActionCreator,
  changeSearchValueActorsCreator,
  setCurrentPageActorsCreator,
  setTotalPagesActorActionCreator,
} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActors } from '../../redux/asyncActions/fetchActors';

const Person = () => {
  const dispatch = useDispatch();

  const actors = useSelector((state) => state.actors.actors);
  const currentPage = useSelector((state) => state.actors.currentPageActors);
  const searchValue = useSelector((state) => state.actors.searchValueActors);
  const totalPages = useSelector((state) => state.actors.totalPagesActors);
  const filteredValue = useSelector((state) => state.actors.filteredValueActors);

  useEffect(() => {
    dispatch(fetchActors(currentPage));
  }, [`${searchValue === '' ? currentPage : ''}`]);

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(changeFiltredValueActorsActionCreator(value));
    }, 500),
    [],
  );

  const setNewTotalPages = (num) => {
    dispatch(setTotalPagesActorActionCreator(num));
  };

  const onChangeSearchValue = (value) => {
    if (value.length === 0) {
      window.location.href = '/person';
    }
    dispatch(changeSearchValueActorsCreator(value));
    updateSearchValue(value);
  };

  return (
    <>
      <div className={classes.poster}>
        <div className={classes.wrapper}>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            showStatus={false}
            showArrows={true}
            showIndicators={true}
          >
            {actors?.map((person) => (
              <Link
                key={person.name}
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/person/${person.id}`}
              >
                <div className={classes.personImage}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${person && person.profile_path}`}
                    alt="img"
                  />
                </div>
                <div className={classes.person__overlay}>
                  <div className={classes.personImage__name}>{person ? person.name : ''}</div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
        <SearchBar searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
        <PersonList
          searchValue={filteredValue}
          currentPage={currentPage}
          setNewTotalPages={(num) => setNewTotalPages(num)}
          popularPersons={actors}
        />

        <Grid container justifyContent="center" sx={{ p: '2rem' }}>
          <div className={classes.paginationWrapper}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, num) => dispatch(setCurrentPageActorsCreator(num))}
              variant="outlined"
              color="primary"
            />
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Person;
