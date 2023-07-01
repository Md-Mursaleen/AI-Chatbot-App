import React, { useRef } from "react";
import { Pressable, StyleSheet, Text, Animated } from "react-native";

const Button = (props) => {
    const expand = useRef(new Animated.Value(0)).current;
    const expand_up = () => {
        Animated.spring(expand, {
            toValue: 5,
            useNativeDriver: true
        }).start();
    };
    const expand_down = () => {
        Animated.spring(expand, {
            toValue: -5,
            bounciness: 12,
            useNativeDriver: true
        }).start();
    };
    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: expand }] }]}>
            <Pressable style={[styles.button, { backgroundColor: props.backgroundColor }]}
                onPressIn={expand_up}
                onPressOut={expand_down}
                onPress={props.onPress}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </Pressable>
        </Animated.View>
    );
}

export default Button;

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    button: {
        paddingVertical: "5.4%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35
    },
    buttonText: {
        alignItems: "center",
        fontSize: 16,
        fontFamily: "OpenSans_600SemiBold",
        color: "white"
    }
});