import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Shop from '../components/Shop';
import AddProduct from '../components/AddProduct';
import About from '../components/About';
import Header from '../components/Header';
import { UserContext } from '../../../App';
import { USERS } from '../DB/DB-Users.js';

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  const { userCredentials } = useContext(UserContext);
  const [userName, setUserName] = useState('');

  const GetUserName = async () => {
    let user = await USERS.get(userCredentials.username);
    setUserName(user.name);
  }

  useEffect(() => {
    GetUserName();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#69BF64',
        tabBarInactiveTintColor: '#CCCCCC',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      }}
    >
      <Tab.Screen
        name={userCredentials.i18n.t("label_shop")}
        component={Shop}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome5 name="store" size={size} color={focused ? "#69BF64" : "#CCCCCC"} />
          ),
          header: () => <Header title={userName} logo={require('../assets/images/logo.png')} />
        }}
      />
      <Tab.Screen
        name={userCredentials.i18n.t("label_add_product")}
        component={AddProduct}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome name="plus" size={size} color={focused ? "#69BF64" : "#CCCCCC"} />
          ),
          header: () => <Header title={userName} logo={require('../assets/images/logo.png')} />
        }}
      />
      <Tab.Screen
        name={userCredentials.i18n.t("label_about")}
        component={About}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome5 name="info-circle" size={size} color={focused ? "#69BF64" : "#CCCCCC"} />
          ),
          header: () => <Header title={userName} logo={require('../assets/images/logo.png')} />
        }}
      />

    </Tab.Navigator>
  );
};

export default AdminTabNavigator;