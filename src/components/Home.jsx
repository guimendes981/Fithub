import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MinhaDieta from './MinhaDieta';

export default function Home({ navigation }) {
  const motivationalQuotes = [
    "A persistência é o caminho do êxito.",
    "Só existe um êxito: a capacidade de levar a vida que se quer.",
    "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
    // Outras citações motivacionais aqui
  ];

  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setMotivationalQuote(motivationalQuotes[randomIndex]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person" size={24} color="#8A2BE2" />
      </TouchableOpacity>
      
      <View style={styles.additionalContent}>
        <Text style={styles.additionalTitle}>Dicas Rápidas:</Text>
        <Text style={styles.additionalText}>Beber água regularmente ajuda a manter o corpo hidratado e a pele saudável.</Text>
      </View>
      
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{motivationalQuote}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TreinoForm')}
        >
          <Text style={styles.buttonText}>Seu Treino</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)} // Abre o modal ao pressionar
        >
          <Text style={styles.buttonText}>Sua Dieta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Academias')}
        >
          <Text style={styles.buttonText}>Academias Próximas</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Minha Dieta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <MinhaDieta onClose={() => setModalVisible(false)} />
      </Modal>
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
    activeOpacity: 0.8,
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
    marginBottom: 10,
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
