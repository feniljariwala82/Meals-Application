import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DefaultText = (props) => {
  return (
    <View>
      <Text style={{ ...styles.screen, ...props.textStyle }}>
        {props.children}
      </Text>
    </View>
  );
};

export default DefaultText;

const styles = StyleSheet.create({
  screen: {
    fontFamily: "open-sans",
  },
});
