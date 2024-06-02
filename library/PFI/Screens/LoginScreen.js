import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Image, NativeModules, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { USERS, isValidUser } from '../DB/DB-Users.js';
import { UserContext } from '../../../App';
import { I18n } from 'i18n-js';

export default function LoginScreen() {

    const i18n = new I18n();
    i18n.translations = require("../assets/translations.json");
    const deviceLanguage = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale // iOS
        : NativeModules.I18nManager.localeIdentifier; // Android
    i18n.locale = deviceLanguage.split("_")[0];

    const navigation = useNavigation();
    const { setUserCredentials } = useContext(UserContext);
    const [username, setUsername] = useState("HJette");
    const [password, setPassword] = useState("password");

    const handleLogin = async () => {
        if (!await isValidUser(username, password)) {
            // Error
            console.log("No user");
            return;
        }
        let user = await USERS.get(username);
        user.isAdmin = user.isAdmin === "true" || user.isAdmin == 1;
        user.i18n = i18n;
        setUserCredentials(user);
        if(user.isAdmin)
            navigation.navigate('Admin');
        else
            navigation.navigate('User');
    };

    const onUserName = (text) => {
        setUsername(text.trim());
    };

    const onPassword = (text) => {
        setPassword(text.trim());
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={{ position: 'absolute', height: '120%', width: 520 }} source={require('../assets/images/background1.jpeg')}></Image>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.loginForm}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Matcha Gotcha</Text>
                    <Text style={styles.loginTitle}>{i18n.t("label_connection")}</Text>
                    <View style={styles.inputContainer}>
                        <Feather style={styles.icon} name="user" size={24} color="#69BF64" />

                        <TextInput style={styles.input} placeholder={i18n.t("placeholder_username")} defaultValue={username} onChangeText={onUserName}></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Feather style={styles.icon} name="lock" size={24} color="#69BF64" />
                        <TextInput style={styles.input} placeholder={i18n.t("placeholder_password")} defaultValue={password} onChangeText={onPassword} secureTextEntry={true}></TextInput>
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginBtnTxt}>{i18n.t("button_connection")}</Text>
                        <Feather style={styles.icon} name="arrow-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        width: 175,
        height: 175,
        alignSelf: 'center'
    },
    title: {
        fontSize: 60,
        textAlign: "center",
        fontFamily: 'Inkbrush',
        color: '#69BF64',
        marginTop: -25,
        marginBottom: 10
    },
    loginForm: {
        marginTop:70,
        width: '90%',
        borderColor: 'lightgrey',
        borderRadius: 2,
        //borderWidth: 1,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
    },
    loginTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "#008556"
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginBottom: 15,
        borderRadius: 5
    },
    icon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    loginBtn: {
        height: 50,
        flexDirection: "row",
        backgroundColor: "#69BF64",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
        marginTop:10
    },
    loginBtnTxt: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        paddingLeft: 15
    }
});
