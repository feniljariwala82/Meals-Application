import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";

import { CATAGORIES } from "../data/dummy-data";

const CatagoryScreen = (props) => {
  let TochableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TochableComp = TouchableNativeFeedback;
  }

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderGridItem = (itemData) => {
    return (
      <View style={styles.gridItem}>
        <TochableComp
          onPress={() => {
            props.navigation.navigate({
              routeName: "CatagoryMeal",
              params: {
                catagoryId: itemData.item.id,
              },
            });
          }}
        >
          <View
            style={{
              ...styles.container,
              ...{ backgroundColor: itemData.item.color },
            }}
          >
            <Text style={styles.text}>{Capitalize(itemData.item.title)}</Text>
          </View>
        </TochableComp>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={CATAGORIES} renderItem={renderGridItem} numColumns={2} />
    </View>
  );
};

export default CatagoryScreen;

CatagoryScreen.navigationOptions = (navData) => {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appButtonContainer: {
    backgroundColor: "#009688",
    marginVertical: 20,
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 130,
    borderRadius: 14,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 6,
  },
  container: {
    flex: 1,
    borderRadius: 14,
    // for IOS
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    // for android
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 22,
  },
});
