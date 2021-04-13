import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../constants/Colors";
import DefaultText from "../components/DefaultText";

const MealItem = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={styles.mealItem}>
      <TouchableComp onPress={props.onSelectMeal.bind(this, props.id)}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText>{props.duration} Minutes</DefaultText>
            <DefaultText>{Capitalize(props.complexity)}</DefaultText>
            <DefaultText>{Capitalize(props.affordability)}</DefaultText>
          </View>
        </View>
      </TouchableComp>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  info: {
    fontSize: 16,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 10,
    textAlign: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  mealItem: {
    height: 240,
    width: "100%",
    backgroundColor: Colors.grey,
    borderRadius: 12,
    overflow: "hidden",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
});
