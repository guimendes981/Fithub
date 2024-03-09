import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const motivationalQuotes = [
    "A persistência é o caminho do êxito.",
    "Só existe um êxito: a capacidade de levar a vida que se quer.",
    "O sucesso é ir de fracasso em fracasso sem perder entusiasmo.",
    "O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo.",
    "O sucesso não é definitivo, o fracasso não é fatal: é a coragem de continuar que conta.",
    "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
    "No meio da dificuldade encontra-se a oportunidade.",
    "Imagine uma nova história para sua vida e acredite nela.",
    "Dificuldades preparam pessoas comuns para destinos extraordinários.",
    "Nenhum mar em calmaria faz bons marinheiros."
  ];

  const [motivationalQuote, setMotivationalQuote] = useState('');

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setMotivationalQuote(motivationalQuotes[randomIndex]);
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      {/* Ícone de perfil */}
      <TouchableOpacity onPress={goToProfile} style={styles.profileIcon}>
        <Ionicons name="person" size={24} color="#8A2BE2" />
      </TouchableOpacity>
      
      {/* Frase motivacional */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{motivationalQuote}</Text>
      </View>
      
      {/* Botões */}
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

      {/* Informações adicionais */}
      <View style={styles.additionalContent}>
        <Text style={styles.additionalTitle}>Dicas Rápidas:</Text>
        <Text style={styles.additionalText}>Beber água regularmente ajuda a manter o corpo hidratado e a pele saudável.</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  quoteContainer: {
    backgroundColor: '#232323',
    borderWidth: 3,
    borderColor: '#8A2BE2',
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
    padding: 10,
  },
  quoteText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '80%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#8A2BE2',
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
  additionalContent: {
    width: '80%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#8A2BE2',
    borderRadius: 5,
    padding: 10,
  },
  additionalTitle: {
    fontSize: 20,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  additionalText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});
