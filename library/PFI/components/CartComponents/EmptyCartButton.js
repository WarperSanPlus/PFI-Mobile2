import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../../../App.js";
import { CART } from "../../DB/DB-Cart"
import Popup from '../../utils/Popup.js';

const EmptyCartButton = () => {
    const { userCredentials, setUpdateCart } = useContext(UserContext);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleClearCart = async () => {
        await CART.clear(userCredentials.username);
        setUpdateCart(true);
    };

    const confirmClearCart = () => {
        setPopupVisible(false);
        handleClearCart();
    };

    return (
        <TouchableOpacity style={styles.emptyCartBtn} onPress={() => setPopupVisible(true)}>
            <Text style={styles.emptyCartTxt}>{userCredentials.i18n.t("label_clear_cart")}</Text>
            <Popup
                visible={popupVisible}
                message={userCredentials.i18n.t("popup_clear_cart")}
                confirmMessage={userCredentials.i18n.t("option_clear_cart_confirm")}
                onCancel={() => setPopupVisible(false)}
                onConfirm={confirmClearCart}
            />
        </TouchableOpacity>

    );
}

export { EmptyCartButton };

const styles = StyleSheet.create({
    emptyCartBtn: {
        backgroundColor: 'tomato',
        height: 40,
        width: 180,
        justifyContent: 'center',
        borderRadius: 3
    },
    emptyCartTxt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'SourceSansPro-Regular'
    }
});