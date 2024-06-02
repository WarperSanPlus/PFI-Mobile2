import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { UserContext } from "../../../../App";
import { GLOBALS } from "../../GLOBALS.js";
import { RouteParamsContext } from "../ProductDetails";
import { clampQuantity } from "../../utils/ClampQuantity.js";
import { CART } from "../../DB/DB-Cart"

const PressableAddToCartMatcha = () => {
  const { idItem } = useContext(RouteParamsContext);
  const { userCredentials, setUpdateCart } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (qt) => setQuantity(clampQuantity(qt));

  async function handleAddToCart() {
    await CART.add(userCredentials.username, idItem, GLOBALS.MATCHA_TYPE, quantity);
    setUpdateCart(true);
    Alert.alert(`${userCredentials.i18n.t("alert_title")}`, `${userCredentials.i18n.t("alert_message_addToCart")}`);
  };
  return (
    <View style={[styles.sectionContainer, styles.addToCartMatchaContainer]}>
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome name="minus" size={24} color="#008556" style={{ marginTop: 10 }} onPress={() => handleQuantity(quantity - 1)} />
        <Text style={styles.txtInputQtMatcha}>{quantity}</Text>
        <FontAwesome name="plus" size={24} color="#008556" style={{ marginTop: 10 }} onPress={() => handleQuantity(quantity + 1)} />
      </View>
      <TouchableOpacity style={styles.pressableAddToCartMatcha} onPress={handleAddToCart}>
        <Text style={[styles.pressableText, { fontSize: 16 }]}>{userCredentials.i18n.t("label_add_cart")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export { PressableAddToCartMatcha };

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
  addToCartMatchaContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  txtInputQtMatcha: {
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
    marginLeft: 10
  },
  pressableAddToCartMatcha: {
    backgroundColor: '#008556',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 3,
    marginLeft: 58,
    width: 215
  }
});
