import axios from "axios";

export const SEARCH_TV = "SEARCH_TV";
export const GET_NOW_PLAYING_FILMS = "GET_NOW_PLAYING_FILMS";
export const GET_POPULAR_FILMS = "GET_POPULAR_FILMS";
export const GET_TOP_RATED_FILMS = "GET_TOP_RATED_FILMS";
export const GET_UPCOMING_FILMS = "GET_UPCOMING_FILMS";
export const GET_AIRING_TODAY_SERIES = "GET_AIRING_TODAY_SERIES";
export const GET_ON_THE_AIR_SERIES = "GET_ON_THE_AIR_SERIES";
export const GET_POPULAR_SERIES = "GET_POPULAR_SERIES";
export const GET_TOP_RATED_SERIES = "GET_TOP_RATED_SERIES";
export const GET_DISCOVER_FILMS = "GET_DISCOVER_FILMS";
export const GET_DISCOVER_SERIES = "GET_DISCOVER_SERIES";
export const GET_DISCOVER_TV = "GET_DISCOVER_TV";
export const REMOVE_TV = "REMOVE_TV";
export const GET_LENGUAGES = "GET_LENGUAGES";
export const GET_GENRES = "GET_GENRES";
export const GET_PROVIDERS = "GET_PROVIDERS";

const URL = "http://localhost:3001";

//GET FILMS
export const getNowPlayingFilms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/films/now-playing`);
      return dispatch({
        type: GET_NOW_PLAYING_FILMS,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getPopularFilms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/films/popular`);
      return dispatch({
        type: GET_POPULAR_FILMS,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getTopRatedFilms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/films/top-rated`);
      return dispatch({
        type: GET_TOP_RATED_FILMS,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getUpcomingFilms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/films/upcoming`);
      return dispatch({
        type: GET_UPCOMING_FILMS,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//GET SERIES

export const getAiringTodaySeries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/series/airing-today`);
      return dispatch({
        type: GET_AIRING_TODAY_SERIES,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getOnTheAirSeries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/series/on-the-air`);
      return dispatch({
        type: GET_ON_THE_AIR_SERIES,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getPopularSeries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/series/popular`);
      return dispatch({
        type: GET_POPULAR_SERIES,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getTopRatedSeries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/series/top-rated`);
      return dispatch({
        type: GET_TOP_RATED_SERIES,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//GET DISCOVER

export const getDiscoverFilms = ({
  sortBy,
  yearRange,
  lenguage,
  genres,
  runtime,
  rating,
}) => {
  return async (dispatch) => {
    try {
      let discoverURL = `${URL}/discover/films?sort_by=${sortBy}`;

      if (yearRange.length > 0) discoverURL += `&year_range=${yearRange}`;
      if (lenguage) discoverURL += `&lenguage=${lenguage}`;
      if (genres.length > 0) discoverURL += `&genres=${genres}`;
      if (runtime.length > 0) discoverURL += `&runtime=${runtime}`;
      if (rating.length > 0) discoverURL += `&rating=${rating}`;

      const { data } = await axios(discoverURL);
      return dispatch({
        type: GET_DISCOVER_FILMS,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getDiscoverSeries = ({
  sortBy,
  yearRange,
  lenguage,
  genres,
  runtime,
  rating,
}) => {
  return async (dispatch) => {
    try {
      let discoverURL = `${URL}/discover/series?sort_by=${sortBy}`;

      if (yearRange.length > 0) discoverURL += `&year_range=${yearRange}`;
      if (lenguage) discoverURL += `&lenguage=${lenguage}`;
      if (genres.length > 0) discoverURL += `&genres=${genres}`;
      if (runtime.length > 0) discoverURL += `&runtime=${runtime}`;
      if (rating.length > 0) discoverURL += `&rating=${rating}`;

      const { data } = await axios(discoverURL);
      return dispatch({
        type: GET_DISCOVER_SERIES,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getDiscoverTv = (sortBy) => {
  return async (dispatch) => {
    try {
      const films = await axios(`${URL}/discover/films?sort_by=${sortBy}`);
      const series = await axios(`${URL}/discover/series?sort_by=${sortBy}`);
      return dispatch({
        type: GET_DISCOVER_TV,
        payload: [...films.data, ...series.data],
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//REMOVE TV

export const removeTv = (tv) => {
  return {
    type: REMOVE_TV,
    payload: tv,
  };
};

//GET LENGUAGES

export const getLenguages = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/lenguages`);
      return dispatch({
        type: GET_LENGUAGES,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//GET GENRES

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/genres`);
      return dispatch({
        type: GET_GENRES,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//GET PROVIDERS

export const getProviders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/providers`);
      return dispatch({
        type: GET_PROVIDERS,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//

export const searchTv = (tv) => {
  return {
    type: SEARCH_TV,
    payload: tv,
  };
};
