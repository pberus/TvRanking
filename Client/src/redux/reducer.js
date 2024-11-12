import { SEARCH_TV } from "./actions";

const initialState = {
  films: [
    {
      title: "Avengers", 
      image: "image", 
      year: "2015", 
      overview: "Los vengadores la pelicula", 
      ratings: 7
    },
    {
      title: "Avengers", 
      image: "image", 
      year: "2015", 
      overview: "Los vengadores la pelicula", 
      ratings: 7
    },
    {
      title: "Avengers", 
      image: "image", 
      year: "2015", 
      overview: "Los vengadores la pelicula", 
      ratings: 7
    }
  ],
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
