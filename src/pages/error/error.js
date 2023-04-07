import React from 'react';
import img from '../../assets/242456-P3J4A7-236.jpg.png';
import classes from './error.module.css';

export const Error = () => {
  return (
    <div className={classes.error}>
        <img src={img} width={'100%'} alt="error"/>
    </div>
  )
}
