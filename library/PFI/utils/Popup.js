import React, { useContext } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { UserContext } from '../../../App';

const Popup = ({ message, confirmMessage, onCancel, onConfirm, visible }) => {
  const { userCredentials } = useContext(UserContext);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: "tomato" }]} onPress={onCancel}>
              <Text style={styles.buttonText}>{userCredentials.i18n.t("option_cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmMessage}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    minWidth: 100,
    backgroundColor: '#69BF64',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15
  },
});

export default Popup;
