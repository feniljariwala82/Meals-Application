import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from "react-native";

const ButtonLayout = (props) => {
  //   let TouchableComp = TouchableOpacity;
  //   if (Platform.OS === "android" && Platform.Version >= 21) {
  //     TouchableComp = TouchableNativeFeedback;
  //   }

  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.appButtonContainer, ...props.appButtonContainer }}
        onPress={props.onUserPress}
      >
        <Text style={{ ...styles.buttonStyle, ...props.buttonStyle }}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonLayout;

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonStyle: {
    textTransform: "uppercase",
    color: "white",
  },
});
