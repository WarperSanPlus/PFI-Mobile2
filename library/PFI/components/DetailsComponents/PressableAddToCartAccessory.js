import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { UserContext } from "../../../../App";
import { GLOBALS } from "../../GLOBALS.js";
import { clampQuantity } from "../../utils/ClampQuantity.js";
import { RouteParamsContext } from "../ProductDetails";
import { CART } from "../../DB/DB-Cart"

const PressableAddToCartAccessory = () => {
    const [quantity, setQuantity] = useState(1);
    const { idItem } = useContext(RouteParamsContext);
    const { userCredentials, setUpdateCart } = useContext(UserContext);

    const handleQuantity = (qt) => setQuantity(clampQuantity(qt));
    async function handleAddToCart() {
        await CART.add(userCredentials.username, idItem, GLOBALS.ACCESSORIES_TYPE, quantity);
        setUpdateCart(true);
        Alert.alert(`${userCredentials.i18n.t("alert_title")}`, `${userCredentials.i18n.t("alert_message_addToCart")}`);
    };

    return (
        <View style={[styles.sectionContainer, styles.addToCartAccesoryContainer]}>
            <View style={{ flexDirection: 'row', paddingLeft: 40 }}>
                <FontAwesome name="minus" size={24} color="#008556" style={{ marginTop: 10 }} onPress={() => handleQuantity(quantity - 1)} />
                <Text style={styles.txtInputQtAccessory}>{quantity}</Text>
                <FontAwesome name="plus" size={24} color="#008556" style={{ marginTop: 10 }} onPress={() => handleQuantity(quantity + 1)} />
            </View>
            <TouchableOpacity style={styles.pressableAddToCartAccessory} onPress={handleAddToCart}>
                <Text style={[styles.pressableText, { fontSize: 16 }]}>{userCredentials.i18n.t("label_add_cart")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export { PressableAddToCartAccessory };

const styles = StyleSheet.create({
    sectionContainer: {
        borderTopWidth: 0.5,
        borderColor: 'lightgrey',
        paddingTop: 15,
        paddingBottom: 15,
    },
    pressableText: {
        color: 'white',
        textAlign: 'center'
    },
    addToCartAccesoryContainer: {
        flexDirection: 'column',
        width: '52%'
    },
    txtInputQtAccessory: {
        borderWidth: 1,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        margin: 15,
        marginTop: 0
    },
    pressableAddToCartAccessory: {
        backgroundColor: '#008556',
        marginLeft: 5,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 3
    }
});  