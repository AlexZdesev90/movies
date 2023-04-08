import React from 'react'
import classes from '../SearchBar/SearchBar.module.css';

export const SearchBar = ({searchValue, onChangeSearchValue}) => {

  return (
    <div className={classes.container}>
    <div className={classes.finder}>
      <div className={classes.finder__outer}>
        <div className={classes.finder__inner}>
          <div className={classes.finder__icon}></div>
          <input className={classes.finder__input} value={searchValue} type="text" onChange={(e) => onChangeSearchValue(e.target.value)} placeholder="Search..." />
        </div>
      </div>
    </div>
</div>
  )
}
