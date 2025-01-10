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
export const ADD_CARD_LIST = "ADD_CARD_LIST";
export const REMOVE_CARD_LIST = "REMOVE_CARD_LIST";
export const GET_ALL_LISTS = "GET_ALL_LISTS";
export const GET_FILTERED_LIST = "GET_FILTERED_LIST";
export const GET_DETAIL = "GET_DETAIL";
export const REMOVE_DETAIL = "REMOVE_DETAIL";

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
  providers,
  page,
}) => {
  return async (dispatch) => {
    try {
      let discoverURL = `${URL}/discover/films?sort_by=${sortBy}`;

      if (yearRange.length > 0) discoverURL += `&year_range=${yearRange}`;
      if (lenguage) discoverURL += `&lenguage=${lenguage}`;
      if (genres.length > 0) discoverURL += `&genres=${genres}`;
      if (runtime.length > 0) discoverURL += `&runtime=${runtime}`;
      if (rating.length > 0) discoverURL += `&rating=${rating}`;
      if (providers.length > 0) discoverURL += `&providers=${providers}`;
      if (page) discoverURL += `&page=${page}`;

      const { data } = await axios(discoverURL);
      return dispatch({
        type: GET_DISCOVER_FILMS,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
          pageExists: Boolean(page),
        },
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
  providers,
  page,
}) => {
  return async (dispatch) => {
    try {
      let discoverURL = `${URL}/discover/series?sort_by=${sortBy}`;

      if (yearRange.length > 0) discoverURL += `&year_range=${yearRange}`;
      if (lenguage) discoverURL += `&lenguage=${lenguage}`;
      if (genres.length > 0) discoverURL += `&genres=${genres}`;
      if (runtime.length > 0) discoverURL += `&runtime=${runtime}`;
      if (rating.length > 0) discoverURL += `&rating=${rating}`;
      if (providers.length > 0) discoverURL += `&providers=${providers}`;
      if (page) discoverURL += `&page=${page}`;

      const { data } = await axios(discoverURL);
      return dispatch({
        type: GET_DISCOVER_SERIES,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
          pageExists: Boolean(page),
        },
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

//LISTS

export const addCardList = ({ id, list, media_type }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/lists`, {
        id,
        list,
        media_type,
      });
      return dispatch({
        type: ADD_CARD_LIST,
        payload: {
          allTv: data.allTv,
          listType: data.list_type,
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const removeCardList = ({ id, list }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${URL}/lists?list_type=${list}&id=${id}`
      );
      return dispatch({
        type: REMOVE_CARD_LIST,
        payload: {
          allTv: data.allTv,
          listType: data.list_type,
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getAllLists = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/lists/`);
      return dispatch({
        type: GET_ALL_LISTS,
        payload: {
          watchlist: data.watchlist,
          seen: data.seen,
          liked: data.liked,
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getFilteredList = ({
  filmsOrSeries,
  sortBy,
  yearRange,
  lenguage,
  genres,
  runtime,
  rating,
  providers,
  list,
}) => {
  return async (dispatch) => {
    try {
      let listURL = `${URL}/lists/filter?media_type=${filmsOrSeries}&list=${list}`;

      if (sortBy) listURL += `&sort_by=${sortBy}`;
      if (yearRange.length > 0) listURL += `&year_range=${yearRange}`;
      if (lenguage) listURL += `&lenguage=${lenguage}`;
      if (genres.length > 0) listURL += `&genres=${genres}`;
      if (runtime.length > 0) listURL += `&runtime=${runtime}`;
      if (rating.length > 0) listURL += `&rating=${rating}`;
      if (providers.length > 0) listURL += `&providers=${providers}`;

      const { data } = await axios(listURL);
      return dispatch({
        type: GET_FILTERED_LIST,
        payload: {
          results: data,
          listType: list,
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//DETAIL

export const getDetail = (title, media_type) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${URL}/detail?title=${title}&media_type=${media_type}`
      );
      return dispatch({
        type: GET_DETAIL,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const removeDetail = () => {
  return {
    type: REMOVE_DETAIL,
  };
};

//

export const searchTv = (tv) => {
  return {
    type: SEARCH_TV,
    payload: tv,
  };
};
