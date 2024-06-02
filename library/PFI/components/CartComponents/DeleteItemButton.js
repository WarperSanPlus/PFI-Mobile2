import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../../../App.js";
import { CART } from "../../DB/DB-Cart"
import Popup from '../../utils/Popup.js';

const DeleteItemButton = ({ idItem, type }) => {
    const { userCredentials, setUpdateCart } = useContext(UserContext);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleDeleteItem = async () => {
        await CART.remove(userCredentials.username, idItem, type);
        setUpdateCart(true);
    }

    const confirmDeleteItem = () => {
        setPopupVisible(false);
        handleDeleteItem();
    };

    return (
        <TouchableOpacity style={styles.btnDeleteItem} onPress={() => setPopupVisible(true)}>
            <Text style={styles.txtBtnDeleteItem}>{userCredentials.i18n.t("label_remove_cart")}</Text>
            <Popup
                visible={popupVisible}
                message={userCredentials.i18n.t("popup_remove_cart")}
                confirmMessage={userCredentials.i18n.t("option_remove_cart_confirm")}
                onCancel={() => setPopupVisible(false)}
                onConfirm={confirmDeleteItem}
            />
        </TouchableOpacity>
    );
}

export { DeleteItemButton };

const styles = StyleSheet.create({
    btnDeleteItem: {
        backgroundColor: 'tomato',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: 15,
        height: 40,
        alignSelf: 'flex-end',
        borderRadius: 3,
        width: 120
    },
    txtBtnDeleteItem: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'SourceSansPro-Regular',
        fontSize: 15
    }
});