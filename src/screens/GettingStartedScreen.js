import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const GettingStartedScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://cmcglobal.com.vn/wp-content/uploads/2021/03/Chatbot.png" }} style={styles.imageStyle} />
            <View style={{ width: "100%" }}>
                <View style={styles.buttonContainer}>
                    <Button title={"Login"} backgroundColor={"#172692"} onPress={() => navigation.navigate("Login")} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={"Signup"} backgroundColor={"#172692"} onPress={() => navigation.navigate("SignUp")} />
                </View>
            </View>
        </View>
    );
}

export default GettingStartedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "white"
    },
    imageStyle: {
        width: "100%",
        height: "36%"
    },
    buttonContainer: {
        paddingTop: "5%",
        paddingHorizontal: "10%",
        width: "100%"
    }
});