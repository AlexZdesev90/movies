import React, { useEffect, useState } from 'react';
import classes from './personList.module.css';
import PersonCard from '../personCard.js/personCard';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import { Link } from 'react-router-dom';

const PersonList = ({ searchValue, currentPage, setNewTotalPages, popularPersons }) => {
  const [personList, setPersonList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setPersonList(popularPersons);
  }, [popularPersons]);
  
  const queryString = (searchValue) => (searchValue !== '' ? `?query=${searchValue}&` : '?');
  
  const getData = (currentPage) => {
    console.log("personlist")
    fetch(`https://api.themoviedb.org/3/search/person${queryString(searchValue)}page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
    .then((res) => res.json())
    .then((data) => {
      setPersonList(data.results);
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
          <PersonCard isLoading={isLoading} key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PersonList;
