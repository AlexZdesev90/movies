import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import classes from './personCard.module.css';
import { Link } from 'react-router-dom';

const PersonCard = ({ person, currentPage }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <SkeletonTheme highlightColor="rgb(169, 165, 166)">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/person/${person.id}`}
          style={{ textDecoration: 'none', color: 'white', textAlign: 'center' }}
        >
          {person.name}
          <div className={classes.image_wrapper}>
            <img className={classes.img} src={`https://image.tmdb.org/t/p/original${person && person.profile_path}`} alt="pict" />
          </div>
        </Link>
      )}
    </>
  );
};

export default PersonCard;
