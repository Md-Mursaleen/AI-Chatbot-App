import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Image, TextInput, Dimensions, ActivityIndicator } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import Button from "../components/Button";

const calcHeight = (size) => size * Dimensions.get("window").height;

const ImageScreen = () => {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [images, setImages] = useState([]);
    const configuration = new Configuration({
        apiKey: "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"
    });
    const openai = new OpenAIApi(configuration);
    async function handleImageSubmit() {
        try {
            setLoading(true);
            const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "512x512"
            });
            setImages(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            {loading === true ? (<ActivityIndicator size={"large"} color="#2e3676" />) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contentContainer}>
                        {images && images.map((image, index) => (
                            <View style={styles.imageContainer} key={index}>
                                <Image source={{ uri: image.url }} style={styles.imageStyle} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
            <View style={{ marginTop: "auto" }}>
                <TextInput
                    placeholder="Enter a prompt for the image"
                    placeholderTextColor="white"
                    value={prompt}
                    onChangeText={(text) => setPrompt(text)}
                    editable={true}
                    style={styles.inputStyle}
                />
                <Button title={"Generate Images"} backgroundColor={"#2e3676"} onPress={handleImageSubmit} style={{ marginBottom: 10 }} />
            </View>
        </View>
    );
}

export default ImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5"
    },
    contentContainer: {
        padding: 10,
        height: calcHeight(0.8),
        backgroundColor: "#f5f5f5"
    },
    imageContainer: {
        flex: 1,
        marginTop: 30,
        alignItems: "center"
    },
    imageStyle: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    inputStyle: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#224957",
        fontSize: 18,
        color: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4
    }
});