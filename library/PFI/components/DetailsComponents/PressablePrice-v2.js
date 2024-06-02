import { Pressable, StyleSheet, Text, View } from "react-native";

// V2 NOT IMPLEMENTED, USED FOR ONLY SHOWING 25G PRICE LABEL FOR MATCHAS
const PressablePrice = ({ prices, selectedPrice, onSelectPrice, setSelectedGrams }) => {

  const renderPrice = (price, label) => {
    const isSelected = selectedPrice === price;
    const priceStyle = {
      container: isSelected ? styles.pressablePrice : [styles.pressablePrice, styles.pressablePriceNotSelected],
      text: [styles.pressableText, styles.gramsTxt, { color: isSelected ? 'white' : 'grey' }]
    };

    return (
      <Pressable key={price} style={[priceStyle.container]} onPress={() => {
        onSelectPrice(price);
        setSelectedGrams(label === '25g' ? '25g' : '50g')
      }}>
        <Text style={priceStyle.text}>{label}</Text>
        <Text style={[styles.pressableText, { color: isSelected ? 'white' : 'grey' }]}>CA${(price).toFixed(2)}</Text>
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingLeft: 25,
    // paddingRight: 25,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressablePriceNotSelected: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontFamily: 'SourceSansPro-Regular'

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
  }
});
