import React, { useContext } from 'react';
import { MATCHAS } from '../DB/DB-Matchas.js';
import { ACCESSORIES } from '../DB/DB-Accessories.js';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetails from './ProductDetails';
import Cart from '../components/Cart'
import { Products } from './ShopComponents/Products.js';
import { UserContext } from '../../../App';

const Stack = createStackNavigator();

export default function Shop() {
  const { userCredentials, updateShop, setUpdateShop } = useContext(UserContext);
  const [products, setProducts] = React.useState([]);

  const initializeShop = async () => {
    if (!updateShop)
      return;
    setProducts(await fetchProducts());
    setUpdateShop(false);
  };

  React.useEffect(() => {
    initializeShop();
  }, [updateShop]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" options={{ headerShown: false }}>
        {() => <Products products={products} showSell={!userCredentials.isAdmin} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: userCredentials.i18n.t("label_details"),
          headerBackTitleVisible: false,
          headerTintColor: "#008556",
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: userCredentials.i18n.t("label_cart"),
          headerBackTitleVisible: false,
          headerTintColor: "#008556",
        }}
      />
    </Stack.Navigator>
  );
};

async function fetchProducts() {
  let matchas = await MATCHAS.get_all();
  let accessories = await ACCESSORIES.get_all();

  matchas = matchas.map(matcha => ({ ...matcha, type: 'matcha' }));
  accessories = accessories.map(accessory => ({ ...accessory, type: 'accessory' }));

  return [...matchas, ...accessories];
};