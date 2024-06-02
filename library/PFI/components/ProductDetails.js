import React, { createContext } from 'react';
import { GLOBALS } from '../GLOBALS.js';
import { ScrollView } from 'react-native';
import { ProductDescription } from './DetailsComponents/ProductDescription.js';
import { ProductOverview } from './DetailsComponents/ProductOverview.js';
import { PressableAddToCartMatcha } from './DetailsComponents/PressableAddToCartMatcha.js';
import { PressableDeleteProduct } from "./DetailsComponents/PressableDeleteProduct.js";
const RouteParamsContext = createContext();
export { RouteParamsContext };

export default function ProductDetails({ route }) {

  const { productName, price, image, description, type, idItem, showSell } = route.params;
  const [selectedPrice, setSelectedPrice] = React.useState(price);
  const [selectedGrams, setSelectedGrams] = React.useState('25g');

  const handleSelectPrice = (selected, grams) => {
    setSelectedPrice(selected);
    setSelectedGrams(grams);
  };

  return (
    <RouteParamsContext.Provider value={{ productName, price, image, description, type, idItem }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <ProductOverview
          selectedPrice={selectedPrice}
          onSelectPrice={handleSelectPrice}
          selectedGrams={selectedGrams}
          setSelectedGrams={setSelectedGrams}
          showSell={showSell}
        />

        {
          type === GLOBALS.ACCESSORIES_TYPE
            ? null
            : (showSell ? <PressableAddToCartMatcha selectedGrams={selectedGrams} selectedPrice={selectedPrice} />
              : <PressableDeleteProduct />)
        }
        <ProductDescription />
      </ScrollView>
    </RouteParamsContext.Provider>
  );
};