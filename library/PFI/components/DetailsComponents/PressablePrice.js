import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { UserContext } from "../../../../App";
import { useContext } from "react";

const PressablePrice = ({ prices, selectedPrice, onSelectPrice, setSelectedGrams }) => {

  const { userCredentials } = useContext(UserContext);

  const renderPrice = (price, label) => {
    const isSelected = selectedPrice === price;
    const priceStyle = {
      container: isSelected ? styles.pressablePrice : [styles.pressablePrice, styles.pressablePriceNotSelected],
      text: [styles.pressableText, styles.gramsTxt, { color: isSelected ? 'white' : 'grey' }]
    };

    const onPressAction = label === '25g' ? () => {
      onSelectPrice(price);
      setSelectedGrams('25g');
    } : null;

    return (
      <Pressable key={price} style={[priceStyle.container]} onPress={onPressAction}>
        {label == '50g' && <Image style={styles.diagonalLine} source={require('../../assets/icons/redline.png')}></Image>}
        <Text style={priceStyle.text}>{label}</Text>
        <Text style={[styles.pressableText, { color: isSelected ? 'white' : 'grey' }]}>CA${(price).toFixed(2)}</Text>
        {label == '50g' && <Text style={styles.outOfStockTxt}>{userCredentials.i18n.t("label_out_of_stock")}</Text>}
      </Pressable>
    );
  };

  return (
    <View style={[styles.sectionContainer, styles.sectionContainerTop, { justifyContent: 'space-around' }]}>
      {prices.map(({ price, label }) => renderPrice(price, label))}
    </View>
  );
};

export { PressablePrice };

const styles = StyleSheet.create({
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
  pressablePrice: {
    backgroundColor: '#69BF64',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressablePriceNotSelected: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontFamily: 'SourceSansPro-Regular',
  },
  pressableText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'SourceSansPro-Regular'
  },
  gramsTxt: {
    paddingBottom: 2,
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'SourceSans'
  },
  diagonalLine: {
    height: 70,
    width: 200,
    position: 'absolute',
    transform: [{ rotate: '8deg' }],
    zIndex: 10,
  },
  outOfStockTxt: {
    marginBottom: -5,
    color: 'red',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11
  }
});
