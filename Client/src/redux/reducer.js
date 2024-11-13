import { GET_FILMS, SEARCH_TV } from "./actions";

const initialState = {
  films: [
    {
      id: 1,
      title: "Avengers", 
      image: "image", 
      year: "2015", 
      overview: "Los vengadores la pelicula", 
      ratings: 7
    },
    {
      id: 2,
      title: "Avengers", 
      image: "image", 
      year: "2015", 
      overview: "Los vengadores la pelicula", 
      ratings: 7
    },
    {
      id: 3,
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
    case GET_FILMS:
      return {
        ...state,
        films: payload
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
