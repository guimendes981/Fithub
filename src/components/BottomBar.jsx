import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomBar({ navigation }) {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Treino')} style={styles.iconContainer}>
        <Ionicons name="barbell" size={24} color="#000" />
        <Text style={styles.iconText}>Treino</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Dieta')} style={styles.iconContainer}>
        <Ionicons name="nutrition" size={24} color="#000" />
        <Text style={styles.iconText}>Dieta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
        <Ionicons name="home" size={24} color="#000" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Academias')} style={styles.iconContainer}>
        <Ionicons name="location" size={24} color="#000" />
        <Text style={styles.iconText}>Academias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3DEC63',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    color: '#000',
    marginTop: 5,
  },
});
