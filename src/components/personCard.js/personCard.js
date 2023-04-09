import React, { useEffect, useState } from 'react';
import classes from './personCard.module.css';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

const PersonCard = ({ 
  // isLoading,
   person,
    // currentPage 
  }) => {

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <ContentLoader
        speed={3}
        width={200}
        height={300}
        viewBox="0 0 220 320"
        backgroundColor="#850840"
        foregroundColor="#300404"
        >
          <rect width="422" height="262" />
        </ContentLoader>
      ) : (
        <Link
          to={`/person/${person.id}`}
          style={{ textDecoration: 'none', color: 'white', textAlign: 'center' }}
        >
          {person.name}
          <div className={classes.image_wrapper}>
            <img
              className={classes.img}
              src={`https://image.tmdb.org/t/p/original${person && person.profile_path}`}
              alt="pict"
            />
          </div>
        </Link>
      )}
    </>
  );
};

export default PersonCard;
