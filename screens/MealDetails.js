import React, { useEffect, useCallback } from "react";
import { Platform } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import DefaultText from "../components/DefaultText";
import { toggleFav } from "../store/actions/mealsAct";

const MealDetails = (props) => {
  // fetching available meals from store
  const availMeals = useSelector((state) => state.meals.meals);
  let mealId = props.navigation.getParam("mealId");
  // fetching favorite meals from the store
  const favoriteMealExists = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  /**
   * Reducer
   */
  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFav(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFavVar: toggleFavHandler });
  }, [toggleFavHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: favoriteMealExists });
  }, [favoriteMealExists]);

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let selectedMeal = availMeals.find((meal) => meal.id === mealId);
  // index numbers for UI
  let i = 0;
  let j = 0;

  const renderIngredient = (itemData) => {
    return (
      <View>
        <DefaultText textStyle={styles.item}>
          {++i}
          {")"} {itemData.item}{" "}
        </DefaultText>
      </View>
    );
  };

  const renderSteps = (itemData) => {
    return (
      <View>
        <DefaultText textStyle={styles.item}>
          {++j}
          {")"} {itemData.item}{" "}
        </DefaultText>
      </View>
    );
  };

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
        <DefaultText>{selectedMeal.duration} Minutes</DefaultText>
        <DefaultText>{Capitalize(selectedMeal.complexity)}</DefaultText>
        <DefaultText>{Capitalize(selectedMeal.affordability)}</DefaultText>
      </View>

      <Text style={styles.title}>
        <MaterialCommunityIcons
          name="format-list-text"
          size={24}
          color={Colors.orange}
        />
        List Of Ingrediants
      </Text>
      <FlatList
        data={selectedMeal.ingredients}
        keyExtractor={(item, index) => item.id}
        renderItem={renderIngredient}
        style={{ width: "100%", padding: 5 }}
      />
      <Text style={styles.title}>
        <Entypo name="info-with-circle" size={24} color={Colors.orange} />
        Steps
      </Text>
      <FlatList
        data={selectedMeal.steps}
        keyExtractor={(item, index) => item.id}
        renderItem={renderSteps}
        style={{ width: "100%", padding: 5 }}
      />
      <View style={styles.screen}>
        <Text>{selectedMeal.title}</Text>
      </View>
    </ScrollView>
  );
};

MealDetails.navigationOptions = (navigationData) => {
  let mealTitle = navigationData.navigation.getParam("mealTitle");
  let toggleFavFunction = navigationData.navigation.getParam("toggleFavVar");
  let isFav = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <View style={styles.icon}>
        <TouchableOpacity onPress={toggleFavFunction}>
          <Icon
            name={isFav ? "heart" : "hearto"}
            type="antdesign"
            color={Platform.OS === "android" ? "white" : Colors.black}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};

export default MealDetails;

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    borderColor: Colors.yellow,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 14,
    textAlign: "justify",
    borderRadius: 10,
  },
  title: {
    padding: 10,
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  image: {
    height: 240,
    width: "100%",
  },
  icon: {
    marginRight: 8,
  },
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
    alignItems: "center",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
});
