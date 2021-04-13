import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "../components/MealItem";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  /**
   * @description this method receives parameter from 'data'
   * @param {Array} itemData
   */
  let renderMeal = (itemData) => {
    const isFav = favoriteMeals.some((meal) => meal.id === itemData.item.id);
    return (
      <View style={{ padding: 12 }}>
        <MealItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          duration={itemData.item.duration}
          affordability={itemData.item.affordability}
          complexity={itemData.item.complexity}
          onSelectMeal={() =>
            props.navigation.navigate({
              routeName: "MealDatail",
              params: {
                mealId: itemData.item.id,
                mealTitle: itemData.item.title,
                isFav: isFav,
              },
            })
          }
        />
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      {props.displayMeals.length > 0 ? (
        <FlatList
          data={props.displayMeals}
          keyExtractor={(item, index) => item.id}
          renderItem={renderMeal}
          style={{ width: "100%" }}
        />
      ) : (
        <Text>No Meals Available</Text>
      )}
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
