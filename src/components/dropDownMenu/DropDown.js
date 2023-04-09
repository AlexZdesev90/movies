import React from 'react';
import classes from '../dropDownMenu/DropDown.module.css';

export const DropDown = ({ filter, onClickChanged }) => {
  const arr = [
    { type: 'popular', id: 1 },
    { type: 'top rated', id: 2 },
    { type: 'upcoming', id: 3 },
  ];
  return (
    <div className={classes.dropdown}>
      <span className={classes.label}> {filter.split('_').join(' ')}</span>
      <ul className={classes.ul}>
        {arr.map((item) => (
          <li key={item.id} onClick={() => onClickChanged(item.type)}>
            <i className={classes.current}></i>
            <button className={classes.link} href="/">
              &nbsp;{item.type}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
