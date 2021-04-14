import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../types";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedMeals = [...state.favoriteMeals];
        updatedMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedMeals,
        };
      } else {
        let meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }

    case SET_FILTERS:
      const appliedFilters = action.filters;
      const newFilteredMeals = state.meals.filter((meal) => {
        if (!meal.isGlutenFree && appliedFilters.glutenFree) {
          return false;
        }
        if (!meal.isLactosFree && appliedFilters.lactoseFree) {
          return false;
        }
        if (!meal.isVegan && appliedFilters.vegan) {
          return false;
        }
        if (!meal.isVegitarian && appliedFilters.vegetarian) {
          return false;
        }

        return true;
      });
      return {
        ...state,
        filteredMeals: newFilteredMeals,
      };

    default:
      return state;
  }
};

export default mealReducer;
