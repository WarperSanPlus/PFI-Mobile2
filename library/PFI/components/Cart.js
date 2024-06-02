import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { CART } from '../DB/DB-Cart.js';
import { Item } from './CartComponents/Item.js';
import { UserContext } from "../../../App";
import { EmptyCartButton } from './CartComponents/EmptyCartButton.js';
import { PurchaseCartButton } from './CartComponents/PurchaseCartButton.js';

async function fetchCart(username) {
    return await CART.get_cart(username);
}

export default function Cart() {
    const [cart, setCart] = useState([]);
    const totalPriceRef = useRef(0);
    const { userCredentials, updateCart, setUpdateCart } = useContext(UserContext);

    const initializeCart = async () => {
        if (!updateCart)
            return;
        setCart(await fetchCart(userCredentials.username));
        const newTotalPrice = await CART.get_cart_total(userCredentials.username);
        totalPriceRef.current = newTotalPrice;
        setUpdateCart(false);
    };

    useEffect(() => {
        initializeCart();
    }, [updateCart]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {cart.length == 0 && (
                <View style={{ marginTop: 70, alignItems: 'center' }}>
                    <Image source={require("../assets/images/empty-cart-image.png")} style={{ height: 250, width: 250, opacity: 0.6 }}></Image>
                    <Text style={{ fontSize: 25, fontFamily: 'SourceSansPro-Regular', color: 'grey' }}>{userCredentials.i18n.t("label_empty_cart")}</Text>
                </View>
            )}
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                <FlatList
                    data={cart}
                    renderItem={({ item }) =>
                        <Item
                            idItem={item.idItem}
                            type={item.type}
                            grams={item.grams}
                            qty={item.quantity}
                        />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            {cart.length > 0 && (
                <View style={{ marginBottom: 10, borderTopWidth: 0.5, borderColor: 'lightgrey', }}>
                    <View style={styles.cartTotalPriceContainer}>
                        <Text style={styles.cartTotalTxt}>{userCredentials.i18n.t("label_total_cart")}:</Text>
                        <Text style={styles.cartTotalPriceTxt}>CA${(totalPriceRef.current).toFixed(2)}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <PurchaseCartButton setUpdateCart={setUpdateCart} totalPrice={(totalPriceRef.current).toFixed(2)} />
                        <EmptyCartButton setUpdateCart={setUpdateCart} />
                    </View>
                </View>

            )}
        </View>
    );
};


const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    cartTotalPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cartTotalTxt: {
        fontSize: 20,
        margin: 20,
        textAlign: 'center'
    },
    cartTotalPriceTxt: {
        fontSize: 25,
        margin: 20,
        marginTop: 17,
        marginRight: 23,
        color: "#008556",
        textAlign: 'center'
    }
});