import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { UserContext } from '../../../App';

export default function About() {
  const { userCredentials } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../assets/images/about.jpg')}></Image>
      <View style={styles.aboutContainer}>
        <Text style={[styles.text, { marginBottom: 20, fontSize: 38, color: '#008556' }]}>{userCredentials.i18n.t("label_app_by")}</Text>
        <Text style={styles.text}>Hugo Jetté</Text>
        <Text style={styles.text}>{userCredentials.i18n.t("label_and")}</Text>
        <Text style={styles.text}>Samuel Gauthier</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: 750
  },
  aboutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 30,
    paddingTop: 40,
    paddingBottom: 40,
    width: '80%',
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Inkbrush',
    fontSize: 20,
    color: '#3A3B3C'
  }
});