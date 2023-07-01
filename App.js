import "react-native-url-polyfill/auto";
import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/state-management/store";
import RootNavigation from "./src/navigation/RootNavigation";
import LoadingScreen from "./src/screens/LoadingScreen";
import {
  useFonts, OpenSans_300Light_Italic, OpenSans_300Light, OpenSans_400Regular, OpenSans_400Regular_Italic, OpenSans_500Medium, OpenSans_500Medium_Italic,
  OpenSans_600SemiBold, OpenSans_600SemiBold_Italic, OpenSans_700Bold, OpenSans_700Bold_Italic, OpenSans_800ExtraBold, OpenSans_800ExtraBold_Italic
} from "@expo-google-fonts/open-sans";

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light, OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold, OpenSans_700Bold, OpenSans_800ExtraBold, OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic, OpenSans_500Medium_Italic, OpenSans_600SemiBold_Italic, OpenSans_700Bold_Italic, OpenSans_800ExtraBold_Italic
  });
  LogBox.ignoreAllLogs();
  if (!fontsLoaded) {
    return (
      <LoadingScreen />
    );
  } else {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <RootNavigation />
        </Provider>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
