import { TOGGLE_FAVORITE } from "../types";

export const toggleFav = (id) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};
