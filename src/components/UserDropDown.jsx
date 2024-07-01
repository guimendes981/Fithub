import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserDropdown = ({ onClose, onProfilePress, onThemePress }) => {
  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={onProfilePress}>
        <Ionicons name="person" size={24} color="#8A2BE2" style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onThemePress}>
        <Ionicons name="moon" size={24} color="#8A2BE2" style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close" size={24} color="#8A2BE2" style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 3,
    flexDirection: 'row',
  },
  menuIcon: {
    padding: 10,
  },
  closeIcon: {
    padding: 10,
    marginLeft: 'auto',
  },
});

export default UserDropdown;
