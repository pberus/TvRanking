import axios from "axios"

export const SEARCH_TV = "SEARCH_TV";
export const GET_NOW_PLAYING_FILMS = "GET_NOW_PLAYING_FILMS"
export const GET_POPULAR_FILMS = "GET_POPULAR_FILMS"
export const GET_TOP_RATED_FILMS = "GET_TOP_RATED_FILMS"
export const GET_UPCOMING_FILMS = "GET_UPCOMING_FILMS"
export const REMOVE_TV = "REMOVE_TV"

const URL = "http://localhost:3001"

export const getNowPlayingFilms =  () => {
  return async (dispatch) => {
    try {
      const {data} = await axios(`${URL}/films/now-playing`)
      return dispatch ({
        type: GET_NOW_PLAYING_FILMS,
        payload: data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

export const getPopularFilms =  () => {
  return async (dispatch) => {
    try {
      const {data} = await axios(`${URL}/films/popular`)
      return dispatch ({
        type: GET_POPULAR_FILMS,
        payload: data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

export const getTopRatedFilms =  () => {
  return async (dispatch) => {
    try {
      const {data} = await axios(`${URL}/films/top-rated`)
      return dispatch ({
        type: GET_TOP_RATED_FILMS,
        payload: data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

export const getUpcomingFilms =  () => {
  return async (dispatch) => {
    try {
      const {data} = await axios(`${URL}/films/upcoming`)
      return dispatch ({
        type: GET_UPCOMING_FILMS,
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
