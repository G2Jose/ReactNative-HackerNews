import React from "react";
import { StyleSheet } from "react-native";

import NavigationBar from "react-native-navbar";

const Navbar = ({ title }) => (
  <NavigationBar
    title={{ title, style: styles.titleStyle }}
    statusBar={{ tintColor: "black", style: "light-content" }}
    tintColor="black"
  />
);

const styles = StyleSheet.create({
  titleStyle: {
    color: "white",
    fontWeight: "bold"
  }
});

export default Navbar;
