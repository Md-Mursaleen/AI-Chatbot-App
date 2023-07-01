import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChatBotTypeData from "../data/ChatBotTypeData";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const chatbot = {
    Noyi: require("../../assets/images/noyi.png"),
    Estor: require("../../assets/images/estor.png"),
    Intra: require("../../assets/images/intra.png"),
    Percy: require("../../assets/images/percy.png"),
    Robo: require("../../assets/images/robo.png")
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const [chatBotTypeData, setChatBotTypeData] = useState([]);
    const [selectedChatBotType, setSelectedChatBotType] = useState([]);
    useEffect(() => {
        setChatBotTypeData(ChatBotTypeData);
        checkBotId();
    }, []);
    const checkBotId = async () => {
        const id = await AsyncStorage.getItem("chatBotId");
        id ? setSelectedChatBotType(ChatBotTypeData[id]) : setSelectedChatBotType(ChatBotTypeData[0]);
    };
    const handleChatBotPress = async (id) => {
        setSelectedChatBotType(ChatBotTypeData[id - 1]);
        await AsyncStorage.setItem("chatBotId", (id - 1).toString());
    };
    return (
        <View style={styles.container}>
            <Text style={[styles.headerText, { color: selectedChatBotType?.color }]}>Hello</Text>
            <Text style={[styles.chatBotText, { color: selectedChatBotType?.color }]}>I am {selectedChatBotType?.name}</Text>
            <Image source={chatbot[selectedChatBotType?.name]} style={styles.selectedImageStyle} />
            <Text style={styles.helpText}>How Can I help you?</Text>
            <View style={styles.chatBotsContainer}>
                <FlatList data={chatBotTypeData}
                    horizontal={true}
                    renderItem={({ item }) => item.id !== selectedChatBotType?.id && (
                        <TouchableOpacity style={{ margin: 15 }}
                            onPress={() => handleChatBotPress(item.id)}>
                            <Image source={chatbot[item.name]} style={styles.notSelectedImageStyle} />
                        </TouchableOpacity>
                    )}
                />
                <Text style={styles.choiceText}>Choose Your ChatBot</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title={"Let's Chat"} backgroundColor={selectedChatBotType?.color} onPress={() => navigation.navigate("Chat")} />
            </View>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 90,
        alignItems: "center"
    },
    headerText: {
        fontSize: 30,
        fontFamily: "OpenSans_600SemiBold"
    },
    chatBotText: {
        fontSize: 30,
        fontFamily: "OpenSans_800ExtraBold"
    },
    selectedImageStyle: {
        marginTop: 20,
        height: 120,
        width: 120
    },
    helpText: {
        marginTop: 30,
        fontSize: 24,
        fontFamily: "OpenSans_700Bold"
    },
    chatBotsContainer: {
        padding: 10,
        marginTop: 30,
        height: 110,
        backgroundColor: "#f6f6f6",
        alignItems: "center",
        borderRadius: 10
    },
    notSelectedImageStyle: {
        width: 40,
        height: 40
    },
    choiceText: {
        marginTop: 5,
        fontSize: 17,
        fontFamily: "OpenSans_700Bold",
        color: "#b0b0b0"
    },
    buttonContainer: {
        padding: 17,
        marginTop: 50,
        width: Dimensions.get("screen").width * 0.9,
        alignItems: "center",
        borderRadius: 100
    },
    buttonText: {
        alignItems: "center",
        fontSize: 16,
        fontFamily: "OpenSans_600SemiBold",
        color: "white"
    }
});