import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import { setLoading, setUser } from "../state-management/reducers";
import Button from "../components/Button";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignIn = () => {
        dispatch(setLoading(true));
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            let user = userCredentials.user;
            dispatch(setUser(user));
        }).catch((error) => {
            console.log(error.message);
        });
        dispatch(setLoading(false));
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.titleStyle}>SignIn</Text>
            </View>
            <View style={{ width: "100%" }}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputStyle}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputStyle}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title={"SignIn"} backgroundColor={"#172692"} onPress={handleSignIn} />
            </View>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "10%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    headerContainer: {
        paddingBottom: "20%",
        bottom: "10%",
        width: "100%",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    titleStyle: {
        fontSize: 50,
        fontFamily: "OpenSans_800ExtraBold",
        color: "#224957"
    },
    inputStyle: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#224957",
        fontSize: 18,
        fontFamily: "OpenSans_400Regular",
        color: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12
    },
    buttonContainer: {
        top: "6%",
        width: "100%"
    }
});