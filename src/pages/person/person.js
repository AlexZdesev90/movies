import React, { useCallback, useEffect} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import classes from './person.module.css';
import PersonList from '../../components/personList.js/personList';
import debounce from 'lodash.debounce';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Pagination, Grid } from '@mui/material';
import {GET_POPULAR_ACTORS, SET_TOTAL_PAGES_ACTOR, SET_CURRENT_PAGE_ACTOR, CHANGE_SEARCH_VALUE_ACTOR, CHANGE_FILTERED_VALUE_ACTOR} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const Person = () => {

  const dispatch = useDispatch();

  const actors = useSelector(state => state.actors.actors);
  const currentPage = useSelector(state => state.actors.currentPageActors);
  const searchValue = useSelector(state => state.actors.searchValueActors);
  const filteredValue = useSelector(state => state.actors.filteredValueActors);
  const totalPages = useSelector(state => state.actors.totalPagesActors);

  useEffect(() => {
    console.log("person")
    fetch(
      `https://api.themoviedb.org/3/person/popular?page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        // setTotalPages(data.total_pages);
        dispatch({type: SET_TOTAL_PAGES_ACTOR, payload: data.total_pages});
        // setPopularPersons(data.results);
        dispatch({type: GET_POPULAR_ACTORS, payload: data.results});

        // setPopularPersons(data.results);
      });
  }, [currentPage]);

  const updateSearchValue = useCallback(
    debounce((value) => {
      // setFilteredValue(value);
      dispatch({type: CHANGE_FILTERED_VALUE_ACTOR, payload: value})
    }, 500),
    [],
  );

  const setNewTotalPages = (num) => {
    dispatch({type: SET_TOTAL_PAGES_ACTOR, payload: num})
  };

  const onChangeSearchValue = (value) => {
    // setSearchValue(searchValue);
    dispatch({type: CHANGE_SEARCH_VALUE_ACTOR, payload: value})
    updateSearchValue(value);
  };
console.log(currentPage)
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
        <SearchBar searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
        <PersonList
          searchValue={filteredValue}
          currentPage={currentPage}
          setNewTotalPages={setNewTotalPages}
          popularPersons={actors}
        />

        <Grid container justifyContent="center" sx={{ p: '2rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, num) => dispatch({type: SET_CURRENT_PAGE_ACTOR, payload: num})}
            variant="outlined"
            color="primary"
          />
        </Grid>
      </div>
    </>
  );
};

export default Person;
