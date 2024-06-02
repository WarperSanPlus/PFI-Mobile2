import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { loadImage } from "../../utils/LoadImage.js";
import { GLOBALS } from "../../GLOBALS.js";
import { ACCESSORIES } from "../../DB/DB-Accessories.js";
import { MATCHAS } from "../../DB/DB-Matchas.js";
import { DeleteItemButton } from './DeleteItemButton.js';
import { ItemPriceTag } from '../ShopComponents/ItemPriceTag.js';
import { ItemQuantity } from './ItemQuantity.js';

async function fetchProduct(idItem, type) {
  if (type === GLOBALS.ACCESSORIES_TYPE) {
    return await ACCESSORIES.get(idItem);
  }
  else {
    return await MATCHAS.get(idItem);
  }
}

const Item = ({ idItem, type, qty }) => {
  const [item, setItem] = useState([]);
  const initializeItem = async () => {
    let item = await fetchProduct(idItem, type);

    if (item != undefined) {
      item.quantity = qty;
    }
    setItem(item);
  };

  useEffect(() => {
    initializeItem();
  }, [idItem]);

  if (item == undefined)
    return null;

  const imageSource = loadImage(item.name);
  return (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={imageSource} />
      <View style={styles.productInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <ItemQuantity qty={item.quantity} price={item.price} item={item} type={type} />
        <View style={styles.bottomContainer}>
          <ItemPriceTag type={type} price={item.price} />
          <DeleteItemButton idItem={item.id} type={type} />
        </View>
      </View>
    </View>
  );
}

export { Item };

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 15
  },
  productInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
});
