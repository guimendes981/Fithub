import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Navbar = ({ navigation, handleLogout }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <FontAwesome name="user" size={24} color="#FFF" />
        <Text style={styles.navButtonText}>Perfil</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.navButton}
        onPress={handleLogout}
      >
        <FontAwesome name="sign-out" size={24} color="#FFF" />
        <Text style={styles.navButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#8A2BE2',
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom : 10,
    width: '40%',
  },
  navButtonText: {
    color: '#FFF',
    marginBottom: 10,
    fontSize: 14,
  },
  divider: {
    borderLeftWidth: 1,
    borderColor: '#FFF',
    marginHorizontal: 25,
    height: '100%',
    alignSelf: 'center',
  },
});

export default Navbar;