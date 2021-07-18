export default function HerosReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case "GET_HEROS":
      return {
        ...state,
        heros: payload,
      };
    case "GET_POWERSTATS":
      return {
        ...state,
        powerstats: payload,
      };
    case "GET_ALL_HEROS":
      return {
        ...state,
        allHeros: payload,
      };
    case "GET_HERO":
      return {
        ...state,
        searchHeros: payload,
      };
    default:
      return state;
  }
}
