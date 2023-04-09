import React, { useEffect, useState } from 'react';
import classes from './personList.module.css';
import PersonCard from '../personCard.js/personCard';
// import {
//   SET_TOTAL_PAGES_ACTOR,

// } from '../../redux/actions/index';
// import { useDispatch, useSelector } from 'react-redux';
import { GET_POPULAR_ACTORS } from '../../redux/actions';

const PersonList = ({
  searchValue, currentPage,
  setNewTotalPages,
   popularPersons
}) => {
  const [personList, setPersonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const dispatch = useDispatch();
  // const actors = useSelector((state) => state.actors.actors);
  // const currentPage = useSelector((state) => state.actors.currentPageActors);
  // const searchValue = useSelector((state) => state.actors.searchValueActors);
  // const filteredValue = useSelector((state) => state.actors.filteredValueActors);
  // const totalPages = useSelector((state) => state.actors.totalPagesActors);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  // }, []);

  useEffect(() => {
    setPersonList(popularPersons);
    // dispatch({ type: GET_POPULAR_ACTORS, payload: popularPersons });
  }, [popularPersons]);

  const queryString = (searchValue) => (searchValue !== '' ? `?query=${searchValue}&` : '?');

  const getData = (currentPage) => {
    fetch(
      `https://api.themoviedb.org/3/search/person${queryString(
        searchValue,
      )}page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPersonList(data.results);
        // dispatch({ type: GET_POPULAR_ACTORS, payload: data.results });
        setNewTotalPages(data.total_pages);
      });
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage, searchValue]);

  return (
    <div className={classes.person__list}>
      <h2 className={classes.person__title}>ACTORS</h2>
      <div className={classes.person__cards}>
        {personList?.map((person) => (
          <PersonCard 
          // isLoading={isLoading}
           key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PersonList;
