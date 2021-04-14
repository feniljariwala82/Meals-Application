import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATAGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";

const CatagoryMeals = (props) => {
  let catId = props.navigation.getParam("catagoryId");

  const availMeals = useSelector((state) => state.meals.filteredMeals);

  let displayMeals = availMeals.filter(
    (meal) => meal.catagoryId.indexOf(catId) >= 0
  );
  // using this component for reusable purpose
  return <MealList displayMeals={displayMeals} navigation={props.navigation} />;
};

export default CatagoryMeals;

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

CatagoryMeals.navigationOptions = (navigationData) => {
  let catId = navigationData.navigation.getParam("catagoryId");
  let selectedCatagory = CATAGORIES.find((catagory) => catagory.id === catId);

  return {
    headerTitle: Capitalize(selectedCatagory.title),
  };
};

const styles = StyleSheet.create({});
