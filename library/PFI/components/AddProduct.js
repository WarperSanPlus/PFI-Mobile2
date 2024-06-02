import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Pressable, Alert } from 'react-native';
import { Keyboard } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { MATCHAS } from '../DB/DB-Matchas.js';
import { ACCESSORIES } from '../DB/DB-Accessories.js';
import { UserContext } from '../../../App';

export default function AddProduct() {
  const { userCredentials, setUpdateShop } = useContext(UserContext);
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const defaultImage = 'logo.png';

  const data = [
    { key: '1', value: 'Matcha', },
    { key: '2', value: 'Accessoire' },
  ]
  const onName = (text) => {
    setName(text.trim());
  };

  const onPrice = (text) => {
    setPrice(text.trim());
  };

  const onDescription = (text) => {
    setDescription(text.trim());
  }

  async function addProduct() {
    if (!selectedType) {
      Alert.alert('Errpr', 'Please select a valid product type.');
      return;
    }

    if (!name || !price || !description) {
      Alert.alert('Errpr', 'Please fill all the fields.');
      return;
    }

    if (selectedType == "Accessoire") {
      await ACCESSORIES.add(name, description, price, defaultImage);
    }
    else if (selectedType == "Matcha") {
      await MATCHAS.add(name, description, price, defaultImage);
    }
    else {
      return;
    }
    setUpdateShop(true);
    Alert.alert(`${userCredentials.i18n.t("alert_title")}`, `${userCredentials.i18n.t("alert_message_addProduct")}`);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{userCredentials.i18n.t("label_add_product")}</Text>
        <View style={styles.addProductContainer}>
          <View>
            <SelectList
              setSelected={(t) => setSelectedType(t)}
              data={data}
              save="value"
              placeholder={userCredentials.i18n.t("placeholder_type")}
              maxHeight={100}
              width={250}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{userCredentials.i18n.t("label_name")}:</Text>
            <TextInput style={styles.inputName} maxLength={100} onChangeText={onName} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{userCredentials.i18n.t("label_price")} (CA$):</Text>
            <TextInput style={styles.inputPrice} keyboardType="numeric" maxLength={5} onChangeText={onPrice} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{userCredentials.i18n.t("label_description")}:</Text>
            <TextInput style={styles.inputDescription}
              multiline={true}
              numberOfLines={10}
              onChangeText={onDescription}
            />
          </View>
          <Pressable style={styles.pressable} onPress={addProduct}>
            <Text style={styles.pressableTxt}>{userCredentials.i18n.t("button_add_product")}</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  addProductContainer: {
    width: '90%',
    alignSelf: 'center',
    padding: 30
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 25,
    fontFamily: 'Helvetica-Bold',
    color: '#008556',
    marginTop: 30
  },
  inputContainer: {
    marginTop: 20
  },
  inputTitle: {
    marginRight: 20,
    marginBottom: 10,
    fontSize: 15,
    color: '#008556'
  },
  inputName: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 3,
    width: '100%',
    height: 40,
    padding: 10
  },
  inputPrice: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 3,
    width: '15%',
    height: 40,
    textAlign: 'center'
  },
  inputDescription: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 3,
    width: '100%',
    height: 150,
    padding: 10
  },
  pressable: {
    backgroundColor: '#008556',
    height: 40,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 3
  },
  pressableTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular'
  }
});