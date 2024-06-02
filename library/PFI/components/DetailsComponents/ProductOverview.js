import { Image, StyleSheet, Text, View } from "react-native";
import { PressablePrice } from "./PressablePrice.js";
import { useContext } from "react";
import { RouteParamsContext } from "../ProductDetails.js";
import { GLOBALS } from "../../GLOBALS.js";
import { PressableAddToCartAccessory } from "./PressableAddToCartAccessory.js";
import { PressableDeleteProduct } from "./PressableDeleteProduct.js";

const ProductOverview = ({ selectedPrice, onSelectPrice, selectedGrams, setSelectedGrams, showSell = true }) => {
  const { productName, image, type, price } = useContext(RouteParamsContext);
  const price50g = (price * (2 - 2 * 15 / 100));

  const sell = type === GLOBALS.ACCESSORIES_TYPE
    ? (showSell ? <PressableAddToCartAccessory /> : <PressableDeleteProduct/>)
    : <View>
      <PressablePrice
        prices={[
          { price: price, label: '25g' },
          { price: price50g, label: '50g' }
        ]}
        selectedPrice={selectedPrice}
        onSelectPrice={onSelectPrice}
        selectedGrams={selectedGrams}
        setSelectedGrams={setSelectedGrams}
      />
    </View>;

  return (
    <View style={{ flexDirection: 'row' }}>
      <Image style={styles.image} source={image} />
      <View style={{ marginTop: 15, width: '100%' }}>
        <Text style={styles.productName}>{productName}</Text>

        <View style={[styles.sectionContainer, styles.sectionContainerTop]}>
          <Text style={styles.price}>CA${(selectedPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        </View>
        {
          sell
        }
      </View>
    </View>
  );
};

export { ProductOverview };

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    marginLeft: -15
  },
  productName: {
    fontSize: 25,
    fontFamily: 'SourceSansPro-Regular',
    maxWidth: 200,
    marginBottom: 15
  },
  sectionContainer: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 15,
    paddingBottom: 15,
  },
  sectionContainerTop: {
    flexDirection: 'row',
    width: '52%'
  },
  price: {
    fontSize: 27,
    color: '#008556',
    fontFamily: 'SourceSansPro-Regular'

  },
});
