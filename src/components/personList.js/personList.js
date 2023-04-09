import React, { useEffect} from 'react';
import classes from './personList.module.css';
import PersonCard from '../personCard.js/personCard';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_LOADING_ACTORS, GET_POPULAR_ACTORS } from '../../redux/actions';

const PersonList = ({
  setNewTotalPages,
   popularPersons
}) => {
  const dispatch = useDispatch();
  const actors = useSelector((state) => state.actors.actors);
  const currentPage = useSelector((state) => state.actors.currentPageActors);
  const filteredValue = useSelector((state) => state.actors.filteredValueActors);

  useEffect(() => {
    // setPersonList(popularPersons);
    dispatch({ type: GET_POPULAR_ACTORS, payload: popularPersons });
  }, []);

  const queryString = (filteredValue) => (filteredValue !== '' ? `?query=${filteredValue}&` : '?');

  const getData = (currentPage) => {
    fetch(
      `https://api.themoviedb.org/3/search/person${queryString(
        filteredValue,
      )}page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        // setPersonList(data.results);
        dispatch({ type: GET_POPULAR_ACTORS, payload: data.results });
        setNewTotalPages(data.total_pages);
      });
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage, filteredValue]);

  return (
    <div className={classes.person__list}>
      <h2 className={classes.person__title}>ACTORS</h2>
      <div className={classes.person__cards}>
        {actors?.map((person) => (
          <PersonCard 
          // isLoading={isLoading}
           key={person.name} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PersonList;
