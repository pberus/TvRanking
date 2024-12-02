import {
  GET_NOW_PLAYING_FILMS,
  GET_POPULAR_FILMS,
  GET_TOP_RATED_FILMS,
  GET_UPCOMING_FILMS,
  SEARCH_TV,
} from "./actions";

const initialState = {
  nowPlayingFilms: [],
  popularFilms: [],
  topRatedFilms: [],
  upcomingFilms: [],
  miTv: [],
  tvDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOW_PLAYING_FILMS:
      return {
        ...state,
        nowPlayingFilms: payload,
      };
    case GET_POPULAR_FILMS:
      return {
        ...state,
        popularFilms: payload,
      };
    case GET_TOP_RATED_FILMS:
      return {
        ...state,
        topRatedFilms: payload,
      };
    case GET_UPCOMING_FILMS:
      return {
        ...state,
        upcomingFilms: payload,
      };
    case SEARCH_TV:
      return {
        ...state,
        tvDetail: payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
