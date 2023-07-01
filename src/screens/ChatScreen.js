import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatBotTypeData from "../data/ChatBotTypeData";

const chatbot = {
    Noyi: require("../../assets/images/noyi.png"),
    Estor: require("../../assets/images/estor.png"),
    Intra: require("../../assets/images/intra.png"),
    Percy: require("../../assets/images/percy.png"),
    Robo: require("../../assets/images/robo.png")
};

const ChatScreen = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatBotColor, setChatBotColor] = useState([]);
    useEffect(() => {
        checkChatBotId();
    }, []);
    const checkChatBotId = async () => {
        const id = await AsyncStorage.getItem("chatBotId");
        SELECTED_CHAT_BOT = id ? chatbot[ChatBotTypeData[id].name] : chatbot[ChatBotTypeData[0].name];
        setChatBotColor(ChatBotTypeData[id].color);
        setMessages([
            {
                _id: 1,
                text: "Hello, I am " + ChatBotTypeData[id].name + ", How Can I help you?",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Md Mursaleen",
                    avatar: SELECTED_CHAT_BOT
                }
            }
        ]);
    };
    const handleSendMessage = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        if (messages[0].text) {
            handleChatSubmit(messages[0].text);
        }
    }, []);
    const handleChatSubmit = async (message) => {
        setLoading(true);
        axios.post("https://api.openai.com/v1/engines/text-davinci-002/completions", {
            prompt: message,
            max_tokens: 1024,
            temperature: 0.5
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${""}`
            }
        }).then((response) => {
            if (response.data.choices[0].text) {
                setLoading(false);
                const apiResponse = {
                    _id: Math.random() * (9999999 - 1),
                    text: response.data.choices[0].text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "Md Mursaleen",
                        avatar: SELECTED_CHAT_BOT
                    }
                }
                setMessages((previousMessages) => GiftedChat.append(previousMessages, apiResponse));
            }
            else {
                setLoading(false);
                const apiResponse = {
                    _id: Math.random() * (9999999 - 1),
                    text: "Sorry I can not help with it",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "Md Mursaleen",
                        avatar: SELECTED_CHAT_BOT
                    }
                }
                setMessages((previousMessages) => GiftedChat.append(previousMessages, apiResponse));
            }
        });
    };
    const renderBubble = (props) => {
        return (
            <Bubble {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#2e3676"
                    }
                }}
                textStyle={{
                    right: {
                        padding: 2
                    },
                    left: {
                        padding: 2,
                        color: "#2e3676"
                    }
                }}
            />
        );
    };
    const renderInputToolbar = (props) => {
        return (
            <InputToolbar {...props}
                containerStyle={{
                    padding: 3,
                    backgroundColor: "#2e3676",
                    color: "white"
                }}
                textInputStyle={{
                    color: "white"
                }}
            />
        );
    };
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="send" size={24} color="white" resizeMode={"center"} />
                </View>
            </Send>
        );
    };
    return (
        <View style={styles.container}>
            <GiftedChat messages={messages}
                isTyping={loading}
                multiline={true}
                onSend={(messages) => handleSendMessage(messages)}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                user={{
                    _id: 1
                }}
            />
        </View>
    );
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    iconContainer: {
        marginBottom: 5,
        marginRight: 10
    }
});
