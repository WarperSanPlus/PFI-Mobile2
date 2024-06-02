import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import Shop from '../components/Shop';
import Supplier from '../components/Supplier';
import About from '../components/About';
import Header from '../components/Header';
import { UserContext } from '../../../App';

const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  const { userCredentials } = useContext(UserContext);

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
          header: () => <Header logo={require('../assets/images/logo.png')}/>
        }}
      />
      <Tab.Screen
        name={userCredentials.i18n.t("label_stores")}
        component={Supplier}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome6 name="map-location-dot" size={size} color={focused ? "#69BF64" : "#CCCCCC"} />
          ),
          header: () => <Header logo={require('../assets/images/logo.png')} />
        }}
      />
      <Tab.Screen
        name={userCredentials.i18n.t("label_about")}
        component={About}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome5 name="info-circle" size={size} color={focused ? "#69BF64" : "#CCCCCC"} />
          ),
          header: () => <Header logo={require('../assets/images/logo.png')} />
        }}
      />

    </Tab.Navigator>
  );
};

export default UserTabNavigator;
