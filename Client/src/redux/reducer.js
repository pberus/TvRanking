import {
  ADD_CARD_LIST,
  AUTHENTICATE,
  GET_AIRING_TODAY_SERIES,
  GET_ALL_LISTS,
  GET_DETAIL,
  GET_DISCOVER_FILMS,
  GET_DISCOVER_SERIES,
  GET_FILTERED_LIST,
  GET_GENRES,
  GET_LENGUAGES,
  GET_NOW_PLAYING_FILMS,
  GET_ON_THE_AIR_SERIES,
  GET_POPULAR_FILMS,
  GET_POPULAR_SERIES,
  GET_PROVIDERS,
  GET_TOP_RATED_FILMS,
  GET_TOP_RATED_SERIES,
  GET_TRENDING,
  GET_UPCOMING_FILMS,
  OPEN_NOT_AUTHENTICATE_LISTS_MODAL,
  REMOVE_CARD_LIST,
  REMOVE_DETAIL,
  REMOVE_LISTS,
  REMOVE_POPOVER_RESULTS,
  REMOVE_TV,
  SEARCH_TV,
  SEARCH_TV_POPOVER,
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
  //TRENDING
  trending: [],
  //LENGUAGES
  lenguages: [],
  //GENRES
  genres: {},
  //PROVIDERS
  providers: {},
  //LISTS
  watchlist: [],
  seen: [],
  liked: [],
  watchlistFiltered: [],
  seenFiltered: [],
  likedFiltered: [],
  //DETAIL
  detail: {},
  //SEARCH
  searchResults: [],
  searchPopoverResults: {},
  //AUTH
  isAuthenticated: { authenticated: false, name: "", email: "" },
  notAuthenticateListsModal: false,
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
          totalResults: payload.totalResults,
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
          totalResults: payload.totalResults,
        },
      };
    case GET_TRENDING:
      return {
        ...state,
        trending: payload,
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
    //LISTS
    case ADD_CARD_LIST:
      return {
        ...state,
        [payload.listType]: payload.allTv,
      };
    case GET_ALL_LISTS:
      return {
        ...state,
        watchlist: payload.watchlist,
        seen: payload.seen,
        liked: payload.liked,
      };
    case REMOVE_CARD_LIST:
      return {
        ...state,
        [payload.listType]: payload.allTv,
      };
    case GET_FILTERED_LIST:
      return {
        ...state,
        [`${payload.listType}Filtered`]: payload.results,
      };
    case REMOVE_LISTS:
      return {
        ...state,
        watchlist: [],
        seen: [],
        liked: [],
      };
    //DETAIL
    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    case REMOVE_DETAIL:
      return {
        ...state,
        detail: {},
      };
    //SEARCH
    case SEARCH_TV:
      return {
        ...state,
        searchResults: payload,
      };
    case SEARCH_TV_POPOVER:
      return {
        ...state,
        searchPopoverResults: payload,
      };
    case REMOVE_POPOVER_RESULTS:
      return {
        ...state,
        searchPopoverResults: {},
      };
    //AUTH
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: {
          authenticated: payload.authenticated,
          name: payload.name ? payload.name : "",
          email: payload.email ? payload.email : "",
        },
      };
    case OPEN_NOT_AUTHENTICATE_LISTS_MODAL:
      return {
        ...state,
        notAuthenticateListsModal: payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
