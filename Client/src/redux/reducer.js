import { GET_FILMS, SEARCH_TV } from "./actions";

const initialState = {
  popularFilms: [],
  miTv: [],
  tvDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FILMS:
      return {
        ...state,
        popularFilms: payload
      }
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
