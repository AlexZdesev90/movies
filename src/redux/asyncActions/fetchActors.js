import { getActorsActionCreator, setTotalPagesActorActionCreator } from '../actions';

export const fetchActors = (currentPage) => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/person/popular?page=${currentPage}&api_key=5058efa201f4ad4fba59a8deb39502b3`,
    )
      .then((res) =>  res.json())
      .then((data) => {
        dispatch(getActorsActionCreator(data.results));
        dispatch(setTotalPagesActorActionCreator(data.total_pages));
      });
  };
};
