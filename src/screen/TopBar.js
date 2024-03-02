

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';

const TopBar = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionsPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleContactUsPress = () => {
    // Handle Contact Us logic
    setModalVisible(true);
  };

  const handleFAQPress = () => {
    // Handle FAQ logic
    setModalVisible(true);
  };
  const handleMenuPress = () => {
    navigation.navigate('menu');
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Image source={require('../../assets/logo2.png')} style={styles.logo}
            onPress={() => navigation.navigate("menu")}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleOptionsPress}>
          <Image source={require('../../assets/menu.png')} style={styles.options} />
        </TouchableOpacity> */}
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={handleContactUsPress}>
              <Text style={styles.optionText}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleFAQPress}>
              <Text style={styles.optionText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  options: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  optionButton: {
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default TopBar;
