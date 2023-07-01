import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { db, collection, addDoc, auth, createUserWithEmailAndPassword } from "../../firebase";
import { setLoading } from "../state-management/reducers";
import Button from "../components/Button";

const SignUpScreen = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const handleSignUp = () => {
        if (password != rePassword) {
            Alert.alert("Password do not match, please try again")
        } else {
            dispatch(setLoading(true));
            try {
                createUserWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
                    const user = userCredentials.user;
                    const docRef = await addDoc(collection(db, "users"), {
                        name: name,
                        email: email,
                        password: password
                    });
                    console.log("Document written with ID: ", docRef.id);
                }).catch((error) => {
                    console.log(error.code, error.message);
                })
            } catch (error) {
                console.log(error);
                dispatch(setLoading(false));
            }
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.titleStyle}>SignUp</Text>
            </View>
            <View style={{ width: "100%" }}>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="white"
                    value={name}
                    onChangeText={setName}
                    style={styles.inputStyle}
                />
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
                <TextInput
                    placeholder="Retype Password"
                    placeholderTextColor="white"
                    value={rePassword}
                    onChangeText={setRePassword}
                    style={styles.inputStyle}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title={"SignUp"} backgroundColor={"#172692"} onPress={handleSignUp} />
            </View>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "10%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white"
    },
    headerContainer: {
        top: "10%",
        width: "100%",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    titleStyle: {
        marginBottom: 24,
        fontSize: 50,
        fontFamily: "OpenSans_800ExtraBold",
        color: "#224957"
    },
    inputStyle: {
        paddingHorizontal: 16,
        paddingVertical: 12,
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
        bottom: "5%",
        width: "100%",
        justifyContent: "center"
    }
});