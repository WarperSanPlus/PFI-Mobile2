import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { GLOBALS } from "../../GLOBALS.js";

const ItemPriceTag = ({ type, price }) => {
  return (
    <View style={[styles.pressablePriceContainer, type === GLOBALS.ACCESSORIES_TYPE ? { paddingTop: 5 } : null]}>
      {type === GLOBALS.ACCESSORIES_TYPE ? null :
        <Text style={[styles.pressablePrice, { paddingTop: 5, fontSize: 17, fontFamily: '', fontWeight: 'bold' }]}>25g</Text>}
      <Text style={[styles.pressablePrice]}>CA${(price == undefined ? 0 : price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
    </View>
  );
}

export { ItemPriceTag };

const styles = StyleSheet.create({
  pressablePriceContainer: {
    backgroundColor: "#69BF64",
    width: 80,
    height: "auto",
    minHeight: 35,
    justifyContent: "center",
    paddingBottom: 5,
    borderRadius: 3,
    marginLeft: 14
  },
  pressablePrice: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular'
  }
});