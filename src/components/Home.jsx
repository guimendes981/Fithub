import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [catFact, setCatFact] = useState('');

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://cat-fact.herokuapp.com/facts/random');
      const data = await response.json();
      setCatFact(data.text);
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    }
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToProfile} style={styles.profileIcon}>
        <Ionicons name="person" size={24} color="#3DEC63" />
      </TouchableOpacity>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{catFact}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Seu IMC:</Text>
          <Text style={styles.infoValue}>--</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Gordura Corporal:</Text>
          <Text style={styles.infoValue}>--</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Treino')}>
          <Text style={styles.buttonText}>Seu Treino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dieta')}>
          <Text style={styles.buttonText}>Sua Dieta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Academias')}>
          <Text style={styles.buttonText}>Academias Próximas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 24,
    color: '#3DEC63',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoTitle: {
    color: '#FFF',
    marginRight: 10,
  },
  infoValue: {
    color: '#FFF',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3DEC63',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
}
);
