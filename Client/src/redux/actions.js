export const SEARCH_TV = "SEARCH_TV";

export const searchTv = (tv) => {
  return {
    type: SEARCH_TV,
    payload: tv,
  };
};
