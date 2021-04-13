import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";

import MealList from "../components/MealList";

const Favorite = (props) => {
  /**
   * Fetching favorites from redux store
   */
  var favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  return (
    <MealList displayMeals={favoriteMeals} navigation={props.navigation} />
  );
};

export default Favorite;

Favorite.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity>
          <Icon
            name="menu"
            type="ionicons"
            color={Platform.OS === "android" ? "white" : Colors.black}
            size={26}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = StyleSheet.create({});
