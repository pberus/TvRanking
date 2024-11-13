import axios from "axios"

export const SEARCH_TV = "SEARCH_TV";
export const GET_FILMS = "GET_FILMS"

const URL = "http://localhost:3001"

export const getFilms =  () => {
  return async (dispatch) => {
    try {
      const {data} = await axios(`${URL}/films`)
      return dispatch ({
        type: GET_FILMS,
        payload: data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

export const searchTv = (tv) => {
  return {
    type: SEARCH_TV,
    payload: tv,
  };
};
