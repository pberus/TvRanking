import { SEARCH_TV } from "./actions";

const initialState = {
  miTv: [],
  tvDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
