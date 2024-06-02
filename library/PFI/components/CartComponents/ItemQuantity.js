import React, { useState, useEffect, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";
import { clampQuantity } from "../../utils/ClampQuantity.js";
import { UserContext } from "../../../../App";
import { CART } from "../../DB/DB-Cart"

const ItemQuantity = ({ qty, price, item, type }) => {
    const [quantity, setQuantity] = useState(qty);
    const { userCredentials, setUpdateCart } = useContext(UserContext);

    useEffect(() => {
        setQuantity(qty)
    }, [qty]);

    async function handleAddQuantity(qt) {
        await CART.add(userCredentials.username, item.id, type, 1);
        setQuantity(clampQuantity(qt));
        setUpdateCart(true);
    };

    async function handleDeductQuantity(qt) {
        if (qt > 0) {
            await CART.remove(userCredentials.username, item.id, type, 1);
            setQuantity(clampQuantity(qt))
            setUpdateCart(true);
        }
    }

    useEffect(() => {
        setQuantity(qty)
    }, []);

    return (
        <View style={styles.topContainer}>
            <View style={styles.qtyContainer}>
                <FontAwesome name="minus" size={24} color="#008556"
                    onPress={() => handleDeductQuantity(quantity - 1)} />
                <Text style={styles.qtyText}>{quantity}</Text>
                <FontAwesome name="plus" size={24} color="#008556"
                    onPress={() => handleAddQuantity(quantity + 1)} />
            </View>
            <Text style={styles.totalPriceItem}>
                CA${(price == undefined ? 0 : price * quantity).toFixed(2)}
            </Text>
        </View>
    );
}

export { ItemQuantity };

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    qtyText: {
        width: 50,
        borderWidth: 1,
        borderColor: 'lightgrey',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10
    },
    totalPriceItem: {
        color: '#008556',
        fontSize: 23,
        textAlign: 'center',
        alignSelf: 'center',
        marginRight: 15,
        fontFamily: 'SourceSansPro-Regular',
    },
});
