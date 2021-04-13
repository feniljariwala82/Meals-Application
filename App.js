import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Fonts from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import MealsNavigator from "./Navigation/MealsNavigator";
import mealReducer from "./store/reducers/mealsReduce";

// calling this function to improve memory and CPU usage
enableScreens();

/**
 * Reducer
 */
const rootReducer = combineReducers({
  meals: mealReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const fetchFonts = () => {
  return Fonts.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.error(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
