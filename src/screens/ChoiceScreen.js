import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const ChoiceScreen = () => {
    const navigation = useNavigation();
    const handleChatSubmit = async () => {
        navigation.navigate("Home");
    };
    const handleImageSubmit = async () => {
        navigation.navigate("Image");
    };
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/003/354/893/non_2x/robot-virtual-assistance-or-chatbot-background-illustration-vector.jpg" }} style={styles.imageStyle} />
            <View style={{ width: "100%" }}>
                <View style={styles.buttonContainer}>
                    <Button title={"Text"} backgroundColor={"#2e3676"} onPress={handleChatSubmit} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={"Image"} backgroundColor={"#2e3676"} onPress={handleImageSubmit} />
                </View>
            </View>
        </View>
    );
}

export default ChoiceScreen;

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
        height: "50%",
        resizeMode: "contain"
    },
    buttonContainer: {
        paddingTop: "5%",
        paddingHorizontal: "10%",
        width: "100%"
    }
});