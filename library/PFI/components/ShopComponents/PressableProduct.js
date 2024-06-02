import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { loadImage } from '../../utils/LoadImage.js';
import { ItemPriceTag } from './ItemPriceTag.js';
const PressableProduct = ({ description, productName, price, type, idItem, showSell }) => {
  const navigation = useNavigation();
  const imageSource = loadImage(productName);

  const navigateToDetails = () => {
    navigation.navigate('ProductDetails',
      { productName, price, description, image: imageSource, type, idItem, showSell }
    );
  };

  return (
    <Pressable style={styles.pressable} onPress={navigateToDetails}>
      <Image style={styles.pressableImage} source={imageSource} />
      <View>
        <Text style={styles.pressableTitle}>{productName}</Text>
        <View style={{ marginLeft: -15 }}>
          <ItemPriceTag type={type} price={price} />
        </View>
      </View>
    </Pressable>
  );
};

export { PressableProduct };

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  pressableImage: {
    width: 120,
    height: 120,
    marginRight: 15
  },
  pressableTitle: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: 20,
    color: "#008556",
    marginBottom: 15,
    maxWidth: 250
  },
});