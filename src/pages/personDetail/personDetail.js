import React, { useEffect, useState } from 'react';
import classes from './personDetail.module.css';
import { useParams } from 'react-router-dom';

const PersonDetail = () => {
  const [currentPerson, setPerson] = useState(null);
  const [currentImages, setImages] = useState([]);
  const [pickImage, setPickImage] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  //adult:false
  // also_known_as: []
  // biography:""
  // birthday:
  // "1993-07-18"
  // deathday:null
  // gender:1
  // homepage:"https://gcm.co.nz/artists/luciane-buchanan"
  // id:1399806
  // imdb_id:
  // "nm4578161"
  // known_for_department:
  // "Acting"
  // name:
  // "Luciane Buchanan"
  // place_of_birth:"New Zealand"
  // popularity:140.249
  // profile_path:"/4BVfv9HE6ZipHqZO8xDlkDFBWlN.jpg"

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=5058efa201f4ad4fba59a8deb39502b3`)
      .then((res) => res.json())
      .then((data) => setPerson(data));
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) => res.json())
      .then((data) => setImages(data.profiles));
    // .then(data => setImages(data.profiles[1].file_path))
  }, []);

  const onClickSetImage = (id) => {
    setPickImage(id);
  };

  //   console.log(currentPerson.name)

  return (
    <div className={classes.wrapper}>
      <div className={classes.main_image}>
        <img
          src={`https://image.tmdb.org/t/p/original${currentImages[pickImage]?.file_path}`}
          width={500}
          alt="main_img"
        />
        <div className={classes.description}>
          <div className={classes.description__name}>
            {currentPerson ? currentPerson.name : ''}
          </div>
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
