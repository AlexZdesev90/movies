import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/5595936_55552.jpg';
import { ImGithub } from 'react-icons/im';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <div className={[classes.item, classes.mainLinks].join(' ')}>
          <Link to="/">
            <img className={classes.header__icon} src={logo} alt="icon" />
          </Link>
          <Link to="/person" style={{ textDecoration: 'none' }}>
            <span>Actors</span>
          </Link>
        </div>
        <div className={[classes.title, classes.item].join(' ')}>
          films and actors search engine
        </div>
        <div className={classes.item}>
          <a href="https://github.com/AlexZdesev90">
            <ImGithub className={classes.iconAuthor} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
