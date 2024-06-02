import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Popup from '../utils/Popup';
import { UserContext } from '../../../App';

const Header = () => {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);
  const { userCredentials, setUpdateCart, setUpdateShop } = useContext(UserContext);

  const confirmLogout = () => {
    setPopupVisible(false);
    setUpdateShop(true);
    navigation.navigate("Login");
  };

  const handleNavigateCart = () => {
    setUpdateCart(true);
    navigation.navigate("Cart")
  }
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>{userCredentials.name}</Text>
      </View>

      <View style={styles.iconsContainer}>
        {
          userCredentials.isAdmin ? null
            : <TouchableOpacity onPress={handleNavigateCart}>
              <FontAwesome5 name="shopping-cart" size={30} color="#69BF64" style={{ marginRight: 25 }} />
            </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => { setPopupVisible(true) }}>
          <FontAwesome5 name="sign-out-alt" size={30} color="#69BF64" />
        </TouchableOpacity>
      </View>

      <Popup
        visible={popupVisible}
        message={userCredentials.i18n.t("popup_deconnection")}
        confirmMessage={userCredentials.i18n.t("option_deconnection_confirm")}
        onCancel={() => { setPopupVisible(false) }}
        onConfirm={confirmLogout}
      />
    </SafeAreaView>
  );
};
export { Header };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 65,
    marginRight: 10,
    marginBottom: 10,
    zIndex: -100
  },
  headerTitle: {
    fontFamily: 'Inkbrush',
    fontSize: 35,
    color: 'darkgreen'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

export default Header;
