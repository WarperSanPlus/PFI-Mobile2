import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext } from 'react';
import { useFonts } from 'expo-font';
import LoginScreen from './library/PFI/Screens/LoginScreen.js';
import UserTabNavigator from './library/PFI/Screens/UserScreen.js';
import AdminTabNavigator from './library/PFI/Screens/AdminScreen.js';
import { USERS } from './library/PFI/DB/DB-Users.js';
import { MATCHAS } from './library/PFI/DB/DB-Matchas.js';
import { ACCESSORIES } from './library/PFI/DB/DB-Accessories.js';
import { CART } from './library/PFI/DB/DB-Cart.js';
import { GLOBALS } from './library/PFI/GLOBALS.js';
import { Database } from './library/DB/db.mjs';
import { LogBox } from 'react-native';
import 'react-native-reanimated';

const UserContext = createContext({});
const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Require cycle:']);

  const [fontsLoaded] = useFonts({
    'SourceSansPro-Regular': require('./library/PFI/assets/fonts/SourceSansPro-Regular.otf'),
    'Inkbrush': require('./library/PFI/assets/fonts/Inkbrush.otf'),
  });
  const [userCredentials, setUserCredentials] = useState({});
  const [updateShop, setUpdateShop] = useState(true);
  const [updateCart, setUpdateCart] = useState(true);

  const initializeApp = async () => {
    Database.db = new Database(GLOBALS.DB_NAME, GLOBALS.DB_SILENT);
    await Database.db.check_locked(GLOBALS.DB_RESET_IF_LOCKED, async () => {
      await USERS.reset();
      await MATCHAS.reset();
      await ACCESSORIES.reset();
      await CART.reset();
    });
  };

  useEffect(() => {
    initializeApp();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserContext.Provider value={{
      userCredentials, setUserCredentials,
      updateShop, setUpdateShop,
      updateCart, setUpdateCart
    }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="User" component={UserTabNavigator} />
          <Stack.Screen name="Admin" component={AdminTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
export { UserContext };
