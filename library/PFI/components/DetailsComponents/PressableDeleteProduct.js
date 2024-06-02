import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { GLOBALS } from "../../GLOBALS.js";
import { RouteParamsContext } from "../ProductDetails";
import Popup from "../../utils/Popup";
import { CART } from '../../DB/DB-Cart.js';
import { UserContext } from '../../../../App';
import { useNavigation } from '@react-navigation/native';

const PressableDeleteProduct = () => {
    const navigation = useNavigation();
    const { idItem, type } = useContext(RouteParamsContext);
    const [popupVisible, setPopupVisible] = useState(false);
    const { userCredentials, setUpdateShop } = useContext(UserContext);

    async function handleDeleteProduct() {
        await CART.delete_product(idItem, type);
        setUpdateShop(true);
    };

    const confirmDelete = () => {
        setPopupVisible(false);
        handleDeleteProduct();
        navigation.goBack();
    };

    return (
        <View style={type === GLOBALS.MATCHA_TYPE ? styles.containerMatcha : styles.container}>
            <TouchableOpacity style={styles.pressable} onPress={() => setPopupVisible(true)}>
                <Text style={styles.pressableText}>Supprimer le produit</Text>
                <Popup
                    visible={popupVisible}
                    message={userCredentials.i18n.t("popup_delete_product")}
                    confirmMessage={userCredentials.i18n.t("option_delete_product_confirm")}
                    onCancel={() => setPopupVisible(false)}
                    onConfirm={confirmDelete}
                />
            </TouchableOpacity>
        </View>
    );
};

export { PressableDeleteProduct };

const styles = StyleSheet.create({
    container: {
        marginRight: 27,
        marginTop: 5,
        marginBottom: 15,
    },
    containerMatcha: {
        alignSelf: 'flex-end',
        marginRight: 27,
        marginTop: 5,
        marginBottom: 15
    },
    pressable: {
        backgroundColor: 'tomato',
        height: 40,
        width: 210,
        justifyContent: 'center',
        borderRadius: 3
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    }
});