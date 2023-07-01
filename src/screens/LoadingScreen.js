import React from "react";
import { Image, StyleSheet, View } from "react-native";

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/loading.gif")} style={styles.imageSytle} />
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "black"
    },
    imageSytle: {
        width: "90%",
        height: "40%",
        resizeMode: "contain"
    }
});