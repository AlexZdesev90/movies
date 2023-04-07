import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/5595936_55552.jpg';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <Link to="/">
          <img className={classes.header__icon} src={logo} alt="icon" />
        </Link>
        <Link to="/person" style={{ textDecoration: 'none' }}>
          <span>Actors</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
