import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../../../../App.js";
import { CART } from "../../DB/DB-Cart"
import Popup from '../../utils/Popup.js';
import { useNavigation } from '@react-navigation/native';

const PurchaseCartButton = ({ totalPrice }) => {
    const navigation = useNavigation();
    const { userCredentials, setUpdateCart } = useContext(UserContext);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleClearCart = async () => {
        await CART.clear(userCredentials.username);
        setUpdateCart(true);
    };

    const confirmClearCart = () => {
        setPopupVisible(false);
        handleClearCart();
        navigation.popToTop();
    };

    return (
        <TouchableOpacity style={styles.purchaseCartBtn} onPress={() => setPopupVisible(true)}>
            <Text style={styles.purchaseCartTxt}>{userCredentials.i18n.t("label_buy_cart")}</Text>
            <Popup
                visible={popupVisible}
                message={`${userCredentials.i18n.t("popup_buy_cart")} CA$${totalPrice}`}
                confirmMessage={userCredentials.i18n.t("option_buy_cart_confirm")}
                onCancel={() => setPopupVisible(false)}
                onConfirm={confirmClearCart}
            />
        </TouchableOpacity>
    );
}

export { PurchaseCartButton };

const styles = StyleSheet.create({
    purchaseCartBtn: {
        backgroundColor: '#008556',
        height: 40,
        width: 180,
        justifyContent: 'center',
        borderRadius: 3
    },
    purchaseCartTxt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'SourceSansPro-Regular'
    }
});