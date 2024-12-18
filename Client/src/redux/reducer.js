import {
  GET_AIRING_TODAY_SERIES,
  GET_DISCOVER_FILMS,
  GET_DISCOVER_SERIES,
  GET_DISCOVER_TV,
  GET_GENRES,
  GET_LENGUAGES,
  GET_NOW_PLAYING_FILMS,
  GET_ON_THE_AIR_SERIES,
  GET_POPULAR_FILMS,
  GET_POPULAR_SERIES,
  GET_PROVIDERS,
  GET_TOP_RATED_FILMS,
  GET_TOP_RATED_SERIES,
  GET_UPCOMING_FILMS,
  REMOVE_TV,
  SEARCH_TV,
} from "./actions";

const initialState = {
  //FILMS
  nowPlayingFilms: [],
  popularFilms: [],
  topRatedFilms: [],
  upcomingFilms: [],
  //SERIES
  airingTodaySeries: [],
  onTheAirSeries: [],
  popularSeries: [],
  topRatedSeries: [],
  //DISCOVER
  discoverFilms: {},
  discoverSeries: {},
  discoverTv: [],
  //LENGUAGES
  lenguages: [],
  //GENRES
  genres: {},
  //PROVIDERS
  providers: {},
  //
  miTv: [],
  tvDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //GET FILMS
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
    //GET SERIES
    case GET_AIRING_TODAY_SERIES:
      return {
        ...state,
        airingTodaySeries: payload,
      };
    case GET_ON_THE_AIR_SERIES:
      return {
        ...state,
        onTheAirSeries: payload,
      };
    case GET_POPULAR_SERIES:
      return {
        ...state,
        popularSeries: payload,
      };
    case GET_TOP_RATED_SERIES:
      return {
        ...state,
        topRatedSeries: payload,
      };
    //DISCOVER
    case GET_DISCOVER_FILMS:
      return {
        ...state,
        discoverFilms: {
          results: payload.pageExists
            ? [...state.discoverFilms.results, ...payload.results]
            : payload.results,
          totalPages: payload.totalPages,
        },
      };
    case GET_DISCOVER_SERIES:
      return {
        ...state,
        discoverSeries: {
          results: payload.pageExists
            ? [...state.discoverSeries.results, ...payload.results]
            : payload.results,
          totalPages: payload.totalPages,
        },
      };
    case GET_DISCOVER_TV:
      return {
        ...state,
        discoverTv: payload,
      };
    //REMOVE TV
    case REMOVE_TV:
      return {
        ...state,
        [payload]: [],
      };
    //LENGUAGES
    case GET_LENGUAGES:
      return {
        ...state,
        lenguages: payload,
      };
    //GENRES
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    //PROVIDERS
    case GET_PROVIDERS:
      return {
        ...state,
        providers: payload,
      };
    //
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
