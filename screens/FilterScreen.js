import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Switch,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import DefaultText from "../components/DefaultText";
import Colors from "../constants/Colors";
import { setFilters } from "../store/actions/mealsAct";

const Filters = (props) => {
  // to avoid unnecessary re-rendering  we are destructuring navigation from props
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  /**
   * Filter Switch Function
   * @param {String} props
   * @returns
   */
  const FilterSwitch = (props) => {
    return (
      <View style={styles.filterContainer}>
        <DefaultText textStyle={styles.filterFontStyle}>
          {props.title}
        </DefaultText>
        <Switch
          value={props.value}
          onValueChange={props.onChange}
          trackColor={{ true: Colors.orange, false: Colors.grey }}
          thumbColor={Platform.OS === "android" ? Colors.orange : ""}
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <DefaultText textStyle={styles.fontStyle}>
        <Feather name="filter" size={30} color={Colors.orange} />
        Available Filters
      </DefaultText>
      {/* Gluten Free */}
      <FilterSwitch
        value={isGlutenFree}
        title="Gluten Free"
        onChange={(newVal) => setIsGlutenFree(newVal)}
      />
      {/* Lactose Free */}
      <FilterSwitch
        value={isLactoseFree}
        title="Lactose Free"
        onChange={(newVal) => setIsLactoseFree(newVal)}
      />
      {/* Vegan Food */}
      <FilterSwitch
        value={isVegan}
        title="Vegan"
        onChange={(newVal) => setIsVegan(newVal)}
      />
      {/* Vegetarian food */}
      <FilterSwitch
        value={isVegetarian}
        title="Vegetarian"
        onChange={(newVal) => setIsVegetarian(newVal)}
      />
    </View>
  );
};

export default Filters;

Filters.navigationOptions = (navData) => {
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
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={navData.navigation.getParam("save")}>
          <Ionicons
            name="ios-save"
            size={26}
            color={Platform.OS === "android" ? "white" : Colors.black}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  fontStyle: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 10,
    textAlign: "center",
  },
  filterContainer: {
    marginVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  filterFontStyle: {
    fontSize: 18,
  },
});
