import React, { useCallback, useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import classes from './person.module.css';
import PersonList from '../../components/personList.js/personList';
import debounce from 'lodash.debounce';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Pagination, Grid } from '@mui/material';

const Person = () => {
  const [popularPersons, setPopularPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [filteredValue, setFilteredValue] = useState('');

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/popular?page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPages(data.total_pages);
        setPopularPersons(data.results);
      });
  }, [currentPage]);

  const updateSearchValue = useCallback(
    debounce((value) => {
      setFilteredValue(value);
    }, 500),
    [],
  );

  const setNewTotalPages = (num) => {
    setTotalPages(num);
  };

  const onChangeSearchValue = (searchValue) => {
    setSearchValue(searchValue);
    updateSearchValue(searchValue);
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
          {popularPersons?.map((person) => (
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
          popularPersons={popularPersons}
        />

        <Grid container justifyContent="center" sx={{ p: '2rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, num) => setCurrentPage(num)}
            variant="outlined"
            color="primary"
          />
        </Grid>
      </div>
    </>
  );
};

export default Person;
