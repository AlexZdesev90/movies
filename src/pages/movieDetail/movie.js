import React, { useEffect, useState } from 'react';
import classes from './movie.module.css';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      });
  };

  if (isLoading) return <Loader />;
  return (
    <div className={classes.movie}>
      <div className={classes.movie__intro}>
        <img
          className={classes.movie__backdrop}
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ''
          }`}
          alt="movie"
        />
      </div>
      <div className={classes.movie__detail}>
        <div className={classes.movie__detailLeft}>
          <div className={classes.movie__posterBox}>
            <img
              className={classes.movie__poster}
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ''
              }`}
              alt="poster"
            />
          </div>
        </div>
        <div className={classes.movie__detailRight}>
          <div className={classes.movie__detailRightTop}>
            <div className={classes.movie__name}>
              {currentMovieDetail ? currentMovieDetail.original_title : ''}
            </div>
            <div className={classes.movie__tagline}>
              {currentMovieDetail ? currentMovieDetail.tagline : ''}
            </div>
            <div className={classes.movie__rating}>
              {currentMovieDetail ? currentMovieDetail.vote_average : ''}{' '}
              <i className="fas fa-star" />
              <span className={classes.movie__voteCount}>
                {currentMovieDetail ? '(' + currentMovieDetail.vote_count + ') votes' : ''}
              </span>
            </div>
            <div className={classes.movie__runtime}>
              {currentMovieDetail ? currentMovieDetail.runtime + ' mins' : ''}
            </div>
            <div className={classes.movie__releaseDate}>
              {currentMovieDetail ? 'Release date: ' + currentMovieDetail.release_date : ''}
            </div>
            <div className={classes.movie__genres}>
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span key={genre} className={classes.movie__genre} id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ''}
            </div>
          </div>
          <div className={classes.movie__detailRightBottom}>
            <div className={classes.synopsisText}>Synopsis</div>
            <div className={classes.text}>
              {currentMovieDetail ? currentMovieDetail.overview : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
