import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform, Text } from "react-native";
import { Icon } from "react-native-elements";
import CatagoryScreen from "../screens/CatagoryScreen";
import CatagoryMeals from "../screens/CatagoryMeals";
import FavouriteScreen from "../screens/Favrourite";
import FilterScreen from "../screens/FilterScreen";
import MealDetails from "../screens/MealDetails";
import Colors from "../constants/Colors";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

const defaultNavConfig = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.orange : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.black,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};

const FavNavigator = createStackNavigator(
  {
    Favorite: {
      screen: FavouriteScreen,
      navigationOptions: {
        title: "My Favourites",
      },
    },
    MealDetail: {
      screen: MealDetails,
      navigationOptions: {
        title: "Meal Details",
      },
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: defaultNavConfig,
  }
);

const MealsNavigator = createStackNavigator(
  {
    Catagories: {
      screen: CatagoryScreen,
      navigationOptions: {
        headerTitle: "Meals Catagories",
      },
    },
    CatagoryMeal: {
      screen: CatagoryMeals,
    },
    MealDatail: MealDetails,
  },
  // second parameter to set default styles for navigation
  {
    mode: "modal",
    defaultNavigationOptions: defaultNavConfig,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans" }}>Home</Text>
        ) : (
          "Home"
        ),
      tabBarIcon: (tabinfo) => {
        return (
          <Icon
            name="ios-restaurant"
            type="ionicon"
            color={tabinfo.tintColor}
            size={26}
          />
        );
      },
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans" }}>Favourites</Text>
        ) : (
          "Favourites"
        ),
      tabBarIcon: (tabinfo) => {
        return (
          <Icon
            name="heart"
            type="ionicon"
            size={26}
            color={tabinfo.tintColor}
          />
        );
      },
    },
  },
};

// bottom navigator
const MealsBottomNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: Colors.orange,
        inactiveColor: Colors.black,
        shifting: true,
        barStyle: {
          backgroundColor: "white",
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.orange,
          inactiveTintColor: Colors.black,
          labelStyle: {
            fontFamily: "open-sans",
          },
        },
      });

/**
 * Filter navigator
 */
const FilterNavigator = createStackNavigator(
  {
    Filters: {
      screen: FilterScreen,
      navigationOptions: {
        title: "Filter",
      },
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: defaultNavConfig,
  }
);

// main drawer navigator
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsBottomNavigator,
      navigationOptions: {
        title: "Meals",
      },
    },
    Filters: {
      screen: FilterNavigator,
      navigationOptions: {
        title: "Filter",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.orange,
      inactiveTintColor: Colors.black,
      labelStyle: {
        fontFamily: "open-sans",
      },
    },
  }
);

export default createAppContainer(MainNavigator);
