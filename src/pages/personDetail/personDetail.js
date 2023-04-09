import React, { useEffect, useState } from 'react';
import classes from './personDetail.module.css';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

const PersonDetail = () => {
  const [currentPerson, setPerson] = useState();
  const [currentImages, setImages] = useState([]);
  const [pickImage, setPickImage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=5058efa201f4ad4fba59a8deb39502b3`)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => setImages(data.profiles));
  }, []);

  const onClickSetImage = (id) => {
    setPickImage(id);
  };

  if (isLoading) return <Loader />;
  return (
    <div className={classes.wrapper}>
      <div className={classes.main_image}>
        <img
          src={`https://image.tmdb.org/t/p/original${currentImages[pickImage]?.file_path}`}
          width={500}
          alt="main_img"
        />
        <div className={classes.description}>
          <div className={classes.description__name}>{currentPerson ? currentPerson.name : ''}</div>
          <div className={classes.description__item}>
            {currentPerson ? currentPerson.birthday : ''}
          </div>
          <div className={classes.description__item}>
            {currentPerson ? currentPerson.known_for_department : ''}
          </div>
          <div className={classes.description__item}>
            {currentPerson ? currentPerson.place_of_birth : ''}
          </div>
          <div className={classes.description__item}>
            {currentPerson ? currentPerson.popularity : ''}
          </div>
        </div>
      </div>
      <div className={classes.gallery}>PHOTO GALLERY</div>
      <div className={classes.person}>
        {currentImages?.map((item, id) => (
          <div className={classes.frame}>
            <img
              key={item}
              onClick={() => onClickSetImage(id)}
              src={`https://image.tmdb.org/t/p/original${item.file_path}`}
              width={50}
              className={[classes.pick, `${id === pickImage ? classes.active : ''}`].join(' ')}
              alt="pick_img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonDetail;
